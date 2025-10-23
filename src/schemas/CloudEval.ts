import * as z from "zod";

const CloudEval = z.object({
  depth: z.int(),
  fen: z.string(),
  knodes: z.int(),
  pvs: z.array(
    z.union([
      z.object({
        cp: z.int(),
        moves: z.string(),
      }),
      z.object({
        mate: z.int(),
        moves: z.string(),
      }),
    ])
  ),
});

type CloudEval = z.infer<typeof CloudEval>;

export { CloudEval };
export default CloudEval;
