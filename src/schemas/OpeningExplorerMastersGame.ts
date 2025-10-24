import * as z from "zod";

import GameColor from "./GameColor";
import OpeningExplorerGamePlayer from "./OpeningExplorerGamePlayer";

const OpeningExplorerMastersGame = z.object({
  id: z.string(),
  winner: z.union([GameColor, z.null()]),
  white: OpeningExplorerGamePlayer,
  black: OpeningExplorerGamePlayer,
  year: z.int(),
  month: z.string().optional(),
});

type OpeningExplorerMastersGame = z.infer<typeof OpeningExplorerMastersGame>;

export { OpeningExplorerMastersGame };
export default OpeningExplorerMastersGame;
