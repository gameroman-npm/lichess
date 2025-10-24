import * as z from "zod";

import OpeningExplorerOpening from "./OpeningExplorerOpening";
import OpeningExplorerPlayerGame from "./OpeningExplorerPlayerGame";

const OpeningExplorerPlayer = z.object({
  opening: z.union([OpeningExplorerOpening, z.null()]),
  queuePosition: z.int(),
  white: z.int(),
  draws: z.int(),
  black: z.int(),
  moves: z.array(
    z.object({
      uci: z.string(),
      san: z.string(),
      averageOpponentRating: z.int(),
      performance: z.int(),
      white: z.int(),
      draws: z.int(),
      black: z.int(),
      game: z.union([OpeningExplorerPlayerGame, z.null()]),
      opening: z.union([OpeningExplorerOpening, z.null()]),
    })
  ),
  recentGames: z.array(
    z.intersection(z.object({ uci: z.string() }), OpeningExplorerPlayerGame)
  ),
});

type OpeningExplorerPlayer = z.infer<typeof OpeningExplorerPlayer>;

export { OpeningExplorerPlayer };
export default OpeningExplorerPlayer;
