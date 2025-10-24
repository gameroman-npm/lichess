import * as z from "zod";

const TimelineEntryUblogPost = z.object({
  type: z.literal(["ublog-post"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    id: z.string(),
    slug: z.string(),
    title: z.string(),
  }),
});

type TimelineEntryUblogPost = z.infer<typeof TimelineEntryUblogPost>;

export { TimelineEntryUblogPost };
export default TimelineEntryUblogPost;
