import { desc } from "drizzle-orm";
import { socialPosts, type InsertSocialPost } from "@db/schema";
import { getDb } from "./connection";

export async function listSocialPosts(limit = 12) {
  return getDb()
    .select()
    .from(socialPosts)
    .orderBy(desc(socialPosts.publishedAt))
    .limit(limit);
}

export async function saveSocialPosts(posts: InsertSocialPost[]) {
  if (!posts.length) return;
  await getDb().transaction(async (tx) => {
    for (const post of posts) {
      await tx
        .insert(socialPosts)
        .values(post)
        .onDuplicateKeyUpdate({
          set: {
            title: post.title,
            body: post.body,
            url: post.url,
            imageUrl: post.imageUrl,
            publishedAt: post.publishedAt,
            syncedAt: new Date(),
          },
        });
    }
  });
}
