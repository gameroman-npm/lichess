import * as z from "zod";

import OpeningExplorerLichessGame from "./OpeningExplorerLichessGame";
import OpeningExplorerOpening from "./OpeningExplorerOpening";

const OpeningExplorerLichess = z.object({
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
      game: z.union([OpeningExplorerLichessGame, z.null()]),
      opening: z.union([OpeningExplorerOpening, z.null()]),
    })
  ),
  topGames: z.array(
    z.intersection(z.object({ uci: z.string() }), OpeningExplorerLichessGame)
  ),
  recentGames: z
    .array(
      z.intersection(z.object({ uci: z.string() }), OpeningExplorerLichessGame)
    )
    .optional(),
  history: z
    .array(
      z.object({
        month: z.string(),
        white: z.int(),
        draws: z.int(),
        black: z.int(),
      })
    )
    .optional(),
});

type OpeningExplorerLichess = z.infer<typeof OpeningExplorerLichess>;

export { OpeningExplorerLichess };
export default OpeningExplorerLichess;
