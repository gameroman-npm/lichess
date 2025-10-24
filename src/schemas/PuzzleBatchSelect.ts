import * as z from "zod";

import PuzzleAndGame from "./PuzzleAndGame";

const PuzzleBatchSelect = z.object({
  puzzles: z.array(PuzzleAndGame).optional(),
});

type PuzzleBatchSelect = z.infer<typeof PuzzleBatchSelect>;

export { PuzzleBatchSelect };
export default PuzzleBatchSelect;
