import * as z from "zod";

const PuzzleBatchSolveRequest = z.object({
  solutions: z
    .array(
      z.object({
        id: z.string().optional(),
        win: z.boolean().optional(),
        rated: z.boolean().optional(),
      })
    )
    .optional(),
});

type PuzzleBatchSolveRequest = z.infer<typeof PuzzleBatchSolveRequest>;

export { PuzzleBatchSolveRequest };
export default PuzzleBatchSolveRequest;
