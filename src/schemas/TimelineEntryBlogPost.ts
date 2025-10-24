import * as z from "zod";

const TimelineEntryBlogPost = z.object({
  type: z.literal(["blog-post"]),
  date: z.number(),
  data: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
  }),
});

type TimelineEntryBlogPost = z.infer<typeof TimelineEntryBlogPost>;

export { TimelineEntryBlogPost };
export default TimelineEntryBlogPost;
