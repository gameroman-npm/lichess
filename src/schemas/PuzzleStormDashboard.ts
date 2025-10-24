import * as z from "zod";

const PuzzleStormDashboard = z.object({
  days: z.array(
    z.object({
      _id: z.string(),
      combo: z.int(),
      errors: z.int(),
      highest: z.int(),
      moves: z.int(),
      runs: z.int(),
      score: z.int(),
      time: z.int(),
    })
  ),
  high: z.object({
    allTime: z.int(),
    day: z.int(),
    month: z.int(),
    week: z.int(),
  }),
});

type PuzzleStormDashboard = z.infer<typeof PuzzleStormDashboard>;

export { PuzzleStormDashboard };
export default PuzzleStormDashboard;
