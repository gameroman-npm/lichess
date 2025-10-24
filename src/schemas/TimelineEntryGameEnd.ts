import * as z from "zod";

import PerfType from "./PerfType";

const TimelineEntryGameEnd = z.object({
  type: z.literal(["game-end"]),
  date: z.number(),
  data: z.object({
    fullId: z.string(),
    opponent: z.string(),
    win: z.boolean(),
    perf: PerfType,
  }),
});

type TimelineEntryGameEnd = z.infer<typeof TimelineEntryGameEnd>;

export { TimelineEntryGameEnd };
export default TimelineEntryGameEnd;
