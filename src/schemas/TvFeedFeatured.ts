import * as z from "zod";

import GameColor from "./GameColor";
import LightUser from "./LightUser";

const TvFeedFeatured = z.object({
  t: z.literal("featured"),
  d: z.object({
    id: z.string(),
    orientation: GameColor,
    players: z.tuple([
      z.object({
        color: GameColor,
        user: LightUser,
        rating: z.int(),
        seconds: z.int(),
      }),
      z.object({
        color: GameColor,
        user: LightUser,
        rating: z.int(),
        seconds: z.int(),
      }),
    ]),
    fen: z.string(),
  }),
});

type TvFeedFeatured = z.infer<typeof TvFeedFeatured>;

export { TvFeedFeatured };
export default TvFeedFeatured;
