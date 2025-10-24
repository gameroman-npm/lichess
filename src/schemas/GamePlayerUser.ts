import * as z from "zod";

import LightUser from "./LightUser";

const GamePlayerUser = z.object({
  user: LightUser,
  rating: z.int(),
  ratingDiff: z.int().optional(),
  name: z.string().optional(),
  provisional: z.boolean().optional(),
  aiLevel: z.int().optional(),
  analysis: z
    .object({
      inaccuracy: z.int(),
      mistake: z.int(),
      blunder: z.int(),
      acpl: z.int(),
      accuracy: z.int().optional(),
    })
    .optional(),
  team: z.string().optional(),
});

type GamePlayerUser = z.infer<typeof GamePlayerUser>;

export { GamePlayerUser };
export default GamePlayerUser;
