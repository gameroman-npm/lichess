import * as z from "zod";

const GameMoveAnalysis = z.object({
  eval: z.int().optional(),
  mate: z.int().optional(),
  best: z.string().optional(),
  variation: z.string().optional(),
  judgment: z
    .object({
      name: z.literal(["Inaccuracy", "Mistake", "Blunder"]).optional(),
      comment: z.string().optional(),
    })
    .optional(),
});

type GameMoveAnalysis = z.infer<typeof GameMoveAnalysis>;

export { GameMoveAnalysis };
export default GameMoveAnalysis;
