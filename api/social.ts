import type { InsertSocialPost } from "@db/schema";
import type { NormalizedSocialPost, SocialSource, SocialSourceState } from "@contracts/social";
import { listSocialPosts, saveSocialPosts } from "./queries/social-posts";
import { log } from "./lib/logger";

const SYNC_INTERVAL_MS = 10 * 60 * 1000;
let lastSyncAttempt = 0;
let syncInFlight: Promise<void> | null = null;

const sourceStates: Record<SocialSource, SocialSourceState> = {
  facebook: { configured: false, connected: false, lastError: null },
  linkedin: { configured: false, connected: false, lastError: null },
};

function cleanText(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function excerpt(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const cut = value.slice(0, maxLength - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 40))}…`;
}

function makeTitle(text: string, source: SocialSource) {
  if (!text) return source === "facebook" ? "Publicação no Facebook" : "Publicação no LinkedIn";
  const firstSentence = text.split(/(?<=[.!?])\s/)[0];
  return excerpt(firstSentence, 112);
}

function validDate(value: string | number) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

async function fetchFacebookPosts(): Promise<NormalizedSocialPost[]> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID || "61551227054424";
  if (!token) return [];
  const version = process.env.FACEBOOK_API_VERSION || "v23.0";
  const params = new URLSearchParams({
    fields: "id,message,created_time,permalink_url,full_picture",
    limit: "8",
  });
  const response = await fetch(`https://graph.facebook.com/${version}/${pageId}/posts?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Facebook respondeu com estado ${response.status}`);
  const payload = await response.json() as {
    data?: Array<{ id: string; message?: string; created_time: string; permalink_url: string; full_picture?: string }>;
  };
  return (payload.data ?? []).map((post) => {
    const text = cleanText(post.message);
    return {
      id: post.id,
      source: "facebook" as const,
      title: makeTitle(text, "facebook"),
      text: excerpt(text || "Consulte a publicação oficial da Fundação no Facebook.", 260),
      url: post.permalink_url,
      imageUrl: post.full_picture || null,
      publishedAt: validDate(post.created_time),
    };
  });
}

async function fetchLinkedInPosts(): Promise<NormalizedSocialPost[]> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const author = process.env.LINKEDIN_AUTHOR_URN;
  if (!token || !author) return [];
  const params = new URLSearchParams({ author, q: "author", count: "8", sortBy: "CREATED" });
  const response = await fetch(`https://api.linkedin.com/rest/posts?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Linkedin-Version": process.env.LINKEDIN_API_VERSION || "202610",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`LinkedIn respondeu com estado ${response.status}`);
  const payload = await response.json() as {
    elements?: Array<{ id: string; commentary?: string; publishedAt?: number; createdAt: number }>;
  };
  return (payload.elements ?? []).map((post) => {
    const text = cleanText(post.commentary);
    return {
      id: post.id,
      source: "linkedin" as const,
      title: makeTitle(text, "linkedin"),
      text: excerpt(text || "Consulte a publicação oficial da Fundação no LinkedIn.", 260),
      url: `https://www.linkedin.com/feed/update/${encodeURIComponent(post.id)}/`,
      imageUrl: null,
      publishedAt: validDate(post.publishedAt ?? post.createdAt),
    };
  });
}

async function syncSource(source: SocialSource) {
  const configured = source === "facebook"
    ? Boolean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN)
    : Boolean(process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_AUTHOR_URN);
  sourceStates[source].configured = configured;
  if (!configured) return;
  try {
    const posts = source === "facebook" ? await fetchFacebookPosts() : await fetchLinkedInPosts();
    const rows: InsertSocialPost[] = posts.map((post) => ({
      id: `${post.source}:${post.id}`,
      source: post.source,
      title: post.title,
      body: post.text,
      url: post.url,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt,
      syncedAt: new Date(),
    }));
    await saveSocialPosts(rows);
    sourceStates[source] = { configured: true, connected: true, lastError: null };
  } catch (error) {
    log.error(`Falha na sincronização de ${source}`, { error: error instanceof Error ? error.message : String(error) });
    sourceStates[source] = {
      configured: true,
      connected: false,
      lastError: "A ligação à API oficial não está disponível de momento.",
    };
  }
}

async function synchronize() {
  await Promise.all([syncSource("facebook"), syncSource("linkedin")]);
}

export async function getSocialFeed() {
  const shouldSync = Date.now() - lastSyncAttempt >= SYNC_INTERVAL_MS;
  if (shouldSync && !syncInFlight) {
    lastSyncAttempt = Date.now();
    syncInFlight = synchronize().finally(() => { syncInFlight = null; });
  }
  if (syncInFlight && !(await listSocialPosts(1)).length) await syncInFlight;
  else if (syncInFlight) await syncInFlight;

  const rows = await listSocialPosts(12);
  return {
    posts: rows.map((row) => ({
      id: row.id,
      source: row.source,
      title: row.title,
      text: row.body,
      url: row.url,
      imageUrl: row.imageUrl,
      publishedAt: row.publishedAt.toISOString(),
    })),
    syncedAt: rows[0]?.syncedAt.toISOString() ?? null,
    sources: sourceStates,
  };
}
