import * as z from "zod";

const TimelineEntryStreamStart = z.object({
  type: z.literal(["stream-start"]),
  date: z.number(),
  data: z.object({
    id: z.string(),
    title: z.string().optional(),
  }),
});

type TimelineEntryStreamStart = z.infer<typeof TimelineEntryStreamStart>;

export { TimelineEntryStreamStart };
export default TimelineEntryStreamStart;
