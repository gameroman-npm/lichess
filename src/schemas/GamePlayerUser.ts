import * as z from "minizod";

import { LightUser } from "./LightUser";

const GamePlayerUser = z.object({
  user: LightUser,
  rating: z.int(),
  ratingDiff: z.optional(z.int()),
  name: z.optional(z.string()),
  provisional: z.optional(z.boolean()),
  analysis: z.optional(
    z.object({
      inaccuracy: z.int(),
      mistake: z.int(),
      blunder: z.int(),
      acpl: z.int(),
      accuracy: z.optional(z.int()),
      phases: z.optional(
        z.object({
          opening: z.optional(z.int()),
          middlegame: z.optional(z.int()),
          endgame: z.optional(z.int()),
        }),
      ),
    }),
  ),
  team: z.optional(z.string()),
});

type GamePlayerUser = z.infer<typeof GamePlayerUser>;

export { GamePlayerUser };
