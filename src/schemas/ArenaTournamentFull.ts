import * as z from "zod";

import ArenaRatingObj from "./ArenaRatingObj";
import ArenaSheet from "./ArenaSheet";
import Clock from "./Clock";
import Flair from "./Flair";
import PatronColor from "./PatronColor";
import Title from "./Title";
import Verdicts from "./Verdicts";

const ArenaTournamentFull = z.object({
  id: z.string(),
  fullName: z.string(),
  rated: z.boolean().optional(),
  spotlight: z.object({ headline: z.string().optional() }).optional(),
  berserkable: z.boolean().optional(),
  onlyTitled: z.boolean().optional(),
  clock: Clock,
  minutes: z.int().optional(),
  createdBy: z.string().optional(),
  system: z.string().optional(),
  secondsToStart: z.int().optional(),
  secondsToFinish: z.int().optional(),
  isFinished: z.boolean().optional(),
  isRecentlyFinished: z.boolean().optional(),
  pairingsClosed: z.boolean().optional(),
  startsAt: z.string().optional(),
  nbPlayers: z.int(),
  verdicts: Verdicts.optional(),
  quote: z
    .object({
      text: z.string().optional(),
      author: z.string().optional(),
    })
    .optional(),
  greatPlayer: z
    .object({
      name: z.string().optional(),
      url: z.url().optional(),
    })
    .optional(),
  allowList: z.array(z.string()).optional(),
  hasMaxRating: z.boolean().optional(),
  maxRating: ArenaRatingObj.optional(),
  minRating: ArenaRatingObj.optional(),
  minRatedGames: z.object({ nb: z.int().optional() }).optional(),
  botsAllowed: z.boolean().optional(),
  minAccountAgeInDays: z.int().optional(),
  perf: z
    .object({
      icon: z.string(),
      key: z.string(),
      name: z.string(),
    })
    .optional(),
  schedule: z
    .object({
      freq: z.string(),
      speed: z.string(),
    })
    .optional(),
  description: z.string().optional(),
  variant: z.string().optional(),
  duels: z
    .array(
      z.object({
        id: z.string().optional(),
        p: z
          .tuple([
            z.object({
              n: z.string().optional(),
              r: z.int().optional(),
              k: z.int().optional(),
            }),
            z.object({
              n: z.string().optional(),
              r: z.int().optional(),
              k: z.int().optional(),
            }),
          ])
          .optional(),
      })
    )
    .optional(),
  standing: z
    .object({
      page: z.int().optional(),
      players: z
        .array(
          z.object({
            name: z.string().optional(),
            title: Title.optional(),
            patron: z.boolean().optional(),
            patronColor: PatronColor.optional(),
            flair: Flair.optional(),
            rank: z.int().optional(),
            rating: z.int().optional(),
            score: z.int().optional(),
            sheet: ArenaSheet.optional(),
          })
        )
        .optional(),
    })
    .optional(),
  featured: z
    .object({
      id: z.string().optional(),
      fen: z.string().optional(),
      orientation: z.string().optional(),
      color: z.string().optional(),
      lastMove: z.string().optional(),
      white: z
        .object({
          name: z.string().optional(),
          id: z.string().optional(),
          rank: z.int().optional(),
          rating: z.int().optional(),
        })
        .optional(),
      black: z
        .object({
          name: z.string().optional(),
          id: z.string().optional(),
          rank: z.int().optional(),
          rating: z.int().optional(),
        })
        .optional(),
      c: z
        .object({
          white: z.int().optional(),
          black: z.int().optional(),
        })
        .optional(),
    })
    .optional(),
  podium: z
    .array(
      z.object({
        name: z.string().optional(),
        title: Title.optional(),
        patron: z.boolean().optional(),
        patronColor: PatronColor.optional(),
        flair: Flair.optional(),
        rank: z.int().optional(),
        rating: z.int().optional(),
        score: z.int().optional(),
        nb: z
          .object({
            game: z.int().optional(),
            berserk: z.int().optional(),
            win: z.int().optional(),
          })
          .optional(),
        performance: z.int().optional(),
      })
    )
    .optional(),
  stats: z
    .object({
      games: z.int(),
      moves: z.int(),
      whiteWins: z.int(),
      blackWins: z.int(),
      draws: z.int(),
      berserks: z.int(),
      averageRating: z.int(),
    })
    .optional(),
  myUsername: z.string().optional(),
});

type ArenaTournamentFull = z.infer<typeof ArenaTournamentFull>;

export { ArenaTournamentFull };
export default ArenaTournamentFull;
