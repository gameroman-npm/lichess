import * as z from "zod";

const TimelineEntryPlanRenew = z.object({
  type: z.literal(["plan-renew"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    months: z.number(),
  }),
});

type TimelineEntryPlanRenew = z.infer<typeof TimelineEntryPlanRenew>;

export { TimelineEntryPlanRenew };
export default TimelineEntryPlanRenew;
