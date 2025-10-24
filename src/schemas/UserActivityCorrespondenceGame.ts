import * as z from "zod";

import GameColor from "./GameColor";
import VariantKey from "./VariantKey";

const UserActivityCorrespondenceGame = z.object({
  id: z.string(),
  color: GameColor,
  url: z.url(),
  variant: VariantKey.optional(),
  speed: z.literal("correspondence").optional(),
  perf: z.literal("correspondence").optional(),
  rated: z.boolean().optional(),
  opponent: z.object({
    user: z.string(),
    rating: z.int(),
  }),
});

type UserActivityCorrespondenceGame = z.infer<
  typeof UserActivityCorrespondenceGame
>;

export { UserActivityCorrespondenceGame };
export default UserActivityCorrespondenceGame;
