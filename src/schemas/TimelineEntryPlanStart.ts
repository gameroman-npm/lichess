import * as z from "zod";

const TimelineEntryPlanStart = z.object({
  type: z.literal(["plan-start"]),
  date: z.number(),
  data: z.object({ userId: z.string() }),
});

type TimelineEntryPlanStart = z.infer<typeof TimelineEntryPlanStart>;

export { TimelineEntryPlanStart };
export default TimelineEntryPlanStart;
