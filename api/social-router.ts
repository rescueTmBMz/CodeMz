import { createRouter, publicQuery } from "./middleware";
import { getSocialFeed } from "./social";

export const socialRouter = createRouter({
  feed: publicQuery.query(() => getSocialFeed()),
});
