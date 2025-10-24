import * as z from "zod";

const PuzzleReplay = z.object({
  replay: z.object({
    days: z.int(),
    theme: z.string(),
    nb: z.int(),
    remaining: z.array(z.string()),
  }),
  angle: z.object({
    key: z.string(),
    name: z.string(),
    desc: z.string(),
  }),
});

type PuzzleReplay = z.infer<typeof PuzzleReplay>;

export { PuzzleReplay };
export default PuzzleReplay;
