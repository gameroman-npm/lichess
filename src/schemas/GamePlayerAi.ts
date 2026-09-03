import * as z from "minizod";

const GamePlayerAi = z.object({
  aiLevel: z.int(),
  analysis: z.optional(
    z.object({
      inaccuracy: z.int(),
      mistake: z.int(),
      blunder: z.int(),
      acpl: z.int(),
      accuracy: z.optional(z.int()),
    }),
  ),
});

type GamePlayerAi = z.infer<typeof GamePlayerAi>;

export { GamePlayerAi };
