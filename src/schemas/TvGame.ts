import * as z from "zod";

import GameColor from "./GameColor";
import LightUser from "./LightUser";

const TvGame = z.object({
  user: LightUser,
  rating: z.int(),
  gameId: z.string(),
  color: GameColor,
});

type TvGame = z.infer<typeof TvGame>;

export { TvGame };
export default TvGame;
