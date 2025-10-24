import * as z from "zod";

import GameColor from "./GameColor";
import OpeningExplorerGamePlayer from "./OpeningExplorerGamePlayer";
import Speed from "./Speed";

const OpeningExplorerPlayerGame = z.object({
  id: z.string(),
  winner: z.union([GameColor, z.null()]),
  speed: Speed,
  mode: z.literal(["rated", "casual"]),
  white: OpeningExplorerGamePlayer,
  black: OpeningExplorerGamePlayer,
  year: z.int(),
  month: z.string(),
});

type OpeningExplorerPlayerGame = z.infer<typeof OpeningExplorerPlayerGame>;

export { OpeningExplorerPlayerGame };
export default OpeningExplorerPlayerGame;
