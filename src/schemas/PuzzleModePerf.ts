import * as z from "zod";

const PuzzleModePerf = z.object({
  runs: z.int(),
  score: z.int(),
});

type PuzzleModePerf = z.infer<typeof PuzzleModePerf>;

export { PuzzleModePerf };
export default PuzzleModePerf;
