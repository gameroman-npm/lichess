import * as z from "zod";

import ArenaPerf from "./ArenaPerf";
import ArenaPosition from "./ArenaPosition";
import ArenaRatingObj from "./ArenaRatingObj";
import ArenaStatus from "./ArenaStatus";
import Clock from "./Clock";
import LightUser from "./LightUser";
import Variant from "./Variant";

const ArenaTournament = z.object({
  id: z.string(),
  createdBy: z.string(),
  system: z.literal("arena"),
  minutes: z.int(),
  clock: Clock,
  rated: z.boolean(),
  fullName: z.string(),
  nbPlayers: z.int(),
  variant: Variant,
  startsAt: z.int(),
  finishesAt: z.int(),
  status: ArenaStatus,
  perf: ArenaPerf,
  secondsToStart: z.int().optional(),
  hasMaxRating: z.boolean().optional(),
  maxRating: ArenaRatingObj.optional(),
  minRating: ArenaRatingObj.optional(),
  minRatedGames: z.object({ nb: z.int().optional() }).optional(),
  botsAllowed: z.boolean().optional(),
  minAccountAgeInDays: z.int().optional(),
  onlyTitled: z.boolean().optional(),
  teamMember: z.string().optional(),
  private: z.boolean().optional(),
  position: ArenaPosition.optional(),
  schedule: z
    .object({
      freq: z.string().optional(),
      speed: z.string().optional(),
    })
    .optional(),
  teamBattle: z
    .object({
      teams: z.array(z.string()).optional(),
      nbLeaders: z.int().optional(),
    })
    .optional(),
  winner: LightUser.optional(),
});

type ArenaTournament = z.infer<typeof ArenaTournament>;

export { ArenaTournament };
export default ArenaTournament;
