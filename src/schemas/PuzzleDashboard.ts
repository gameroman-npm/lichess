import * as z from "zod";

import PuzzlePerformance from "./PuzzlePerformance";

const PuzzleDashboard = z.object({
  days: z.int(),
  global: PuzzlePerformance,
  themes: z.record(
    z.string(),
    z.object({
      results: PuzzlePerformance,
      theme: z.string(),
    })
  ),
});

type PuzzleDashboard = z.infer<typeof PuzzleDashboard>;

export { PuzzleDashboard };
export default PuzzleDashboard;
