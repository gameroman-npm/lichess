import * as z from "zod";

const TimelineEntryFollow = z.object({
  type: z.literal(["follow"]),
  date: z.number(),
  data: z.object({
    u1: z.string(),
    u2: z.string(),
  }),
});

type TimelineEntryFollow = z.infer<typeof TimelineEntryFollow>;

export { TimelineEntryFollow };
export default TimelineEntryFollow;
