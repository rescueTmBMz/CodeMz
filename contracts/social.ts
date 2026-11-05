export type SocialSource = "facebook" | "linkedin";

export type NormalizedSocialPost = {
  id: string;
  source: SocialSource;
  title: string;
  text: string;
  url: string;
  imageUrl: string | null;
  publishedAt: Date;
};

export type SocialSourceState = {
  configured: boolean;
  connected: boolean;
  lastError: string | null;
};
