import * as z from "zod";

import SwissStatus from "./SwissStatus";
import Verdicts from "./Verdicts";

const SwissTournament = z.object({
  id: z.string(),
  createdBy: z.string(),
  startsAt: z.string(),
  name: z.string(),
  clock: z.object({
    limit: z.number(),
    increment: z.number(),
  }),
  variant: z.string(),
  round: z.number(),
  nbRounds: z.number(),
  nbPlayers: z.number(),
  nbOngoing: z.number(),
  status: SwissStatus,
  stats: z
    .object({
      games: z.number(),
      whiteWins: z.number(),
      blackWins: z.number(),
      draws: z.number(),
      byes: z.number(),
      absences: z.number(),
      averageRating: z.number(),
    })
    .optional(),
  rated: z.boolean(),
  verdicts: Verdicts,
  nextRound: z
    .object({
      at: z.iso.datetime().optional(),
      in: z.int().optional(),
    })
    .optional(),
});

type SwissTournament = z.infer<typeof SwissTournament>;

export { SwissTournament };
export default SwissTournament;
