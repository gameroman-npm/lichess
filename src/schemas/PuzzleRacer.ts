import * as z from "zod";

const PuzzleRacer = z.object({
  id: z.string(),
  url: z.url(),
});

type PuzzleRacer = z.infer<typeof PuzzleRacer>;

export { PuzzleRacer };
export default PuzzleRacer;
