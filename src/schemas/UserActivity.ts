import * as z from "zod";

import Flair from "./Flair";
import PuzzleModePerf from "./PuzzleModePerf";
import UserActivityCorrespondenceGame from "./UserActivityCorrespondenceGame";
import UserActivityFollowList from "./UserActivityFollowList";
import UserActivityScore from "./UserActivityScore";

const UserActivity = z.object({
  interval: z.object({
    start: z.int(),
    end: z.int(),
  }),
  games: z
    .object({
      chess960: UserActivityScore.optional(),
      atomic: UserActivityScore.optional(),
      racingKings: UserActivityScore.optional(),
      ultraBullet: UserActivityScore.optional(),
      blitz: UserActivityScore.optional(),
      kingOfTheHill: UserActivityScore.optional(),
      bullet: UserActivityScore.optional(),
      correspondence: UserActivityScore.optional(),
      horde: UserActivityScore.optional(),
      puzzle: UserActivityScore.optional(),
      classical: UserActivityScore.optional(),
      rapid: UserActivityScore.optional(),
    })
    .optional(),
  puzzles: z.object({ score: UserActivityScore.optional() }).optional(),
  storm: PuzzleModePerf.optional(),
  racer: PuzzleModePerf.optional(),
  streak: PuzzleModePerf.optional(),
  tournaments: z
    .object({
      nb: z.int().optional(),
      best: z
        .array(
          z.object({
            tournament: z.object({
              id: z.string(),
              name: z.string(),
            }),
            nbGames: z.int(),
            score: z.int(),
            rank: z.int(),
            rankPercent: z.int(),
          })
        )
        .optional(),
    })
    .optional(),
  practice: z
    .array(
      z.object({
        url: z.string(),
        name: z.string(),
        nbPositions: z.int(),
      })
    )
    .optional(),
  simuls: z.array(z.string()).optional(),
  correspondenceMoves: z
    .object({
      nb: z.int(),
      games: z.array(UserActivityCorrespondenceGame),
    })
    .optional(),
  correspondenceEnds: z
    .object({
      correspondence: z.object({
        score: UserActivityScore,
        games: z.array(UserActivityCorrespondenceGame),
      }),
    })
    .optional(),
  follows: z
    .object({
      in: UserActivityFollowList.optional(),
      out: UserActivityFollowList.optional(),
    })
    .optional(),
  studies: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
  teams: z
    .array(
      z.object({
        url: z.url(),
        name: z.string(),
        flair: Flair.optional(),
      })
    )
    .optional(),
  posts: z
    .array(
      z.object({
        topicUrl: z.string(),
        topicName: z.string(),
        posts: z.array(
          z.object({
            url: z.string(),
            text: z.string(),
          })
        ),
      })
    )
    .optional(),
  patron: z.object({ months: z.int() }).optional(),
  stream: z.boolean().optional(),
});

type UserActivity = z.infer<typeof UserActivity>;

export { UserActivity };
export default UserActivity;
