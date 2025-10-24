import * as z from "zod";

const TimelineEntryStudyLike = z.object({
  type: z.literal(["study-like"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    studyId: z.string(),
    studyName: z.string(),
  }),
});

type TimelineEntryStudyLike = z.infer<typeof TimelineEntryStudyLike>;

export { TimelineEntryStudyLike };
export default TimelineEntryStudyLike;
