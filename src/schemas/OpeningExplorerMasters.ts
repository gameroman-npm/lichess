import * as z from "zod";

import OpeningExplorerMastersGame from "./OpeningExplorerMastersGame";
import OpeningExplorerOpening from "./OpeningExplorerOpening";

const OpeningExplorerMasters = z.object({
  opening: z.union([OpeningExplorerOpening, z.null()]),
  white: z.int(),
  draws: z.int(),
  black: z.int(),
  moves: z.array(
    z.object({
      uci: z.string(),
      san: z.string(),
      averageRating: z.int(),
      white: z.int(),
      draws: z.int(),
      black: z.int(),
      game: z.union([OpeningExplorerMastersGame, z.null()]),
      opening: z.union([OpeningExplorerOpening, z.null()]),
    })
  ),
  topGames: z.array(
    z.intersection(z.object({ uci: z.string() }), OpeningExplorerMastersGame)
  ),
});

type OpeningExplorerMasters = z.infer<typeof OpeningExplorerMasters>;

export { OpeningExplorerMasters };
export default OpeningExplorerMasters;
