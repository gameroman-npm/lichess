import * as z from "zod";

import PuzzleAndGame from "./PuzzleAndGame";

const PuzzleBatchSolveResponse = z.object({
  puzzles: z.array(PuzzleAndGame).optional(),
  rounds: z.array(z.unknown()).optional(),
});

type PuzzleBatchSolveResponse = z.infer<typeof PuzzleBatchSolveResponse>;

export { PuzzleBatchSolveResponse };
export default PuzzleBatchSolveResponse;
