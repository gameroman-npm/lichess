import * as z from "zod";

import LightUser from "./LightUser";

const PerfStat = z.object({
  user: z.object({ name: z.string() }),
  perf: z.object({
    glicko: z
      .object({
        rating: z.number().optional(),
        deviation: z.number().optional(),
        provisional: z.boolean().optional(),
      })
      .optional(),
    nb: z.int().optional(),
    progress: z.int().optional(),
  }),
  rank: z.int().nullable(),
  percentile: z.number(),
  stat: z.object({
    highest: z
      .object({
        int: z.int(),
        at: z.iso.datetime(),
        gameId: z.string(),
      })
      .optional(),
    lowest: z
      .object({
        int: z.int(),
        at: z.iso.datetime(),
        gameId: z.string(),
      })
      .optional(),
    bestWins: z.object({
      results: z.array(
        z.object({
          opRating: z.int(),
          opId: LightUser,
          at: z.iso.datetime(),
          gameId: z.string(),
        })
      ),
    }),
    worstLosses: z.object({
      results: z.array(
        z.object({
          opRating: z.int(),
          opId: LightUser,
          at: z.iso.datetime(),
          gameId: z.string(),
        })
      ),
    }),
    count: z.object({
      all: z.int(),
      rated: z.int(),
      win: z.int(),
      loss: z.int(),
      draw: z.int(),
      tour: z.int(),
      berserk: z.int(),
      opAvg: z.number(),
      seconds: z.int(),
      disconnects: z.int(),
    }),
    resultStreak: z.object({
      win: z.object({
        cur: z.object({
          v: z.int(),
          from: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
          to: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
        }),
        max: z.object({
          v: z.int(),
          from: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
          to: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
        }),
      }),
      loss: z.object({
        cur: z.object({
          v: z.int(),
          from: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
          to: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
        }),
        max: z.object({
          v: z.int(),
          from: z
            .object({
              at: z.string(),
              gameId: z.string(),
            })
            .optional(),
          to: z
            .object({
              at: z.string(),
              gameId: z.string(),
            })
            .optional(),
        }),
      }),
    }),
    playStreak: z.object({
      nb: z.object({
        cur: z.object({ v: z.int() }),
        max: z.object({
          v: z.int(),
          from: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
          to: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
        }),
      }),
      time: z.object({
        cur: z.object({ v: z.int() }),
        max: z.object({
          v: z.int(),
          from: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
          to: z
            .object({
              at: z.iso.datetime(),
              gameId: z.string(),
            })
            .optional(),
        }),
      }),
      lastDate: z.iso.datetime().optional(),
    }),
  }),
});

type PerfStat = z.infer<typeof PerfStat>;

export { PerfStat };
export default PerfStat;
