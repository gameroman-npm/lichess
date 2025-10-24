import * as z from "zod";

const TimelineEntryTeamCreate = z.object({
  type: z.literal(["team-create"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    teamId: z.string(),
  }),
});

type TimelineEntryTeamCreate = z.infer<typeof TimelineEntryTeamCreate>;

export { TimelineEntryTeamCreate };
export default TimelineEntryTeamCreate;
