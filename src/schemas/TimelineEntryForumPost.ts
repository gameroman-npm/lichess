import * as z from "zod";

const TimelineEntryForumPost = z.object({
  type: z.literal(["forum-post"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    topicId: z.string(),
    topicName: z.string(),
    postId: z.string(),
  }),
});

type TimelineEntryForumPost = z.infer<typeof TimelineEntryForumPost>;

export { TimelineEntryForumPost };
export default TimelineEntryForumPost;
