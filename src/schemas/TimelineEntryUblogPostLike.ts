import * as z from "zod";

const TimelineEntryUblogPostLike = z.object({
  type: z.literal(["ublog-post-like"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    id: z.string(),
    title: z.string(),
  }),
});

type TimelineEntryUblogPostLike = z.infer<typeof TimelineEntryUblogPostLike>;

export { TimelineEntryUblogPostLike };
export default TimelineEntryUblogPostLike;
