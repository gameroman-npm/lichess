import * as z from "zod";

const PuzzleActivity = z.object({
  date: z.int(),
  puzzle: z.object({
    fen: z.string(),
    id: z.string(),
    lastMove: z.string(),
    plays: z.int(),
    rating: z.int(),
    solution: z.array(z.string()),
    themes: z.array(z.string()),
  }),
  win: z.boolean(),
});

type PuzzleActivity = z.infer<typeof PuzzleActivity>;

export { PuzzleActivity };
export default PuzzleActivity;
