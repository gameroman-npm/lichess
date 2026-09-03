import * as z from "minizod";

import { ArenaRatingObj } from "./ArenaRatingObj";
import { ArenaSheet } from "./ArenaSheet";
import { Clock } from "./Clock";
import { Flair } from "./Flair";
import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";
import { Title } from "./Title";
import { Verdicts } from "./Verdicts";

const ArenaTournamentFull = z.object({
  id: z.string(),
  fullName: z.string(),
  rated: z.optional(z.boolean()),
  spotlight: z.optional(z.object({ headline: z.optional(z.string()) })),
  berserkable: z.optional(z.boolean()),
  onlyTitled: z.optional(z.boolean()),
  clock: Clock,
  minutes: z.optional(z.int()),
  createdBy: z.optional(z.string()),
  system: z.optional(z.string()),
  secondsToStart: z.optional(z.int()),
  secondsToFinish: z.optional(z.int()),
  isFinished: z.optional(z.boolean()),
  isRecentlyFinished: z.optional(z.boolean()),
  pairingsClosed: z.optional(z.boolean()),
  startsAt: z.optional(z.string()),
  nbPlayers: z.int(),
  verdicts: z.optional(Verdicts),
  quote: z.optional(
    z.object({
      text: z.optional(z.string()),
      author: z.optional(z.string()),
    }),
  ),
  greatPlayer: z.optional(
    z.object({
      name: z.optional(z.string()),
      url: z.optional(z.url()),
    }),
  ),
  allowList: z.optional(z.array(z.string())),
  hasMaxRating: z.optional(z.boolean()),
  maxRating: z.optional(ArenaRatingObj),
  minRating: z.optional(ArenaRatingObj),
  minRatedGames: z.optional(z.object({ nb: z.optional(z.int()) })),
  botsAllowed: z.optional(z.boolean()),
  minAccountAgeInDays: z.optional(z.int()),
  perf: z.optional(
    z.object({
      icon: z.string(),
      key: z.string(),
      name: z.string(),
    }),
  ),
  schedule: z.optional(
    z.object({
      freq: z.string(),
      speed: z.string(),
    }),
  ),
  description: z.optional(z.string()),
  variant: z.optional(z.string()),
  duels: z.optional(
    z.array(
      z.object({
        id: z.optional(z.string()),
        p: z.optional(
          z.tuple([
            z.object({
              n: z.optional(z.string()),
              r: z.optional(z.int()),
              k: z.optional(z.int()),
            }),
            z.object({
              n: z.optional(z.string()),
              r: z.optional(z.int()),
              k: z.optional(z.int()),
            }),
          ]),
        ),
      }),
    ),
  ),
  standing: z.optional(
    z.object({
      page: z.optional(z.int()),
      players: z.optional(
        z.array(
          z.object({
            name: z.optional(z.string()),
            title: z.optional(Title),
            patron: z.optional(Patron),
            patronColor: z.optional(PatronColor),
            flair: z.optional(Flair),
            rank: z.optional(z.int()),
            rating: z.optional(z.int()),
            score: z.optional(z.int()),
            sheet: z.optional(ArenaSheet),
            realName: z.optional(z.string()),
          }),
        ),
      ),
    }),
  ),
  featured: z.optional(
    z.object({
      id: z.optional(z.string()),
      fen: z.optional(z.string()),
      orientation: z.optional(z.string()),
      color: z.optional(z.string()),
      lastMove: z.optional(z.string()),
      white: z.optional(
        z.object({
          name: z.optional(z.string()),
          id: z.optional(z.string()),
          rank: z.optional(z.int()),
          rating: z.optional(z.int()),
        }),
      ),
      black: z.optional(
        z.object({
          name: z.optional(z.string()),
          id: z.optional(z.string()),
          rank: z.optional(z.int()),
          rating: z.optional(z.int()),
        }),
      ),
      c: z.optional(
        z.object({
          white: z.optional(z.int()),
          black: z.optional(z.int()),
        }),
      ),
    }),
  ),
  podium: z.optional(
    z.array(
      z.object({
        name: z.optional(z.string()),
        title: z.optional(Title),
        patron: z.optional(Patron),
        patronColor: z.optional(PatronColor),
        flair: z.optional(Flair),
        rank: z.optional(z.int()),
        rating: z.optional(z.int()),
        score: z.optional(z.int()),
        nb: z.optional(
          z.object({
            game: z.optional(z.int()),
            berserk: z.optional(z.int()),
            win: z.optional(z.int()),
          }),
        ),
        performance: z.optional(z.int()),
      }),
    ),
  ),
  stats: z.optional(
    z.object({
      games: z.int(),
      moves: z.int(),
      whiteWins: z.int(),
      blackWins: z.int(),
      draws: z.int(),
      berserks: z.int(),
      averageRating: z.int(),
    }),
  ),
  myUsername: z.optional(z.string()),
});

type ArenaTournamentFull = z.infer<typeof ArenaTournamentFull>;

export { ArenaTournamentFull };
