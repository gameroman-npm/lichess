import * as z from "zod";

import Flair from "./Flair";
import GameColor from "./GameColor";
import PatronColor from "./PatronColor";
import PerfType from "./PerfType";
import Title from "./Title";

const PuzzleAndGame = z.object({
  game: z.object({
    clock: z.string(),
    id: z.string(),
    perf: z.object({
      key: PerfType,
      name: z.string(),
    }),
    pgn: z.string(),
    players: z.tuple([
      z.object({
        color: GameColor,
        flair: Flair.optional(),
        id: z.string(),
        name: z.string(),
        patron: z.boolean().optional(),
        patronColor: PatronColor.optional(),
        rating: z.int(),
        title: Title.optional(),
      }),
      z.object({
        color: GameColor,
        flair: Flair.optional(),
        id: z.string(),
        name: z.string(),
        patron: z.boolean().optional(),
        patronColor: PatronColor.optional(),
        rating: z.int(),
        title: Title.optional(),
      }),
    ]),
    rated: z.boolean(),
  }),
  puzzle: z.object({
    id: z.string(),
    initialPly: z.int(),
    plays: z.int(),
    rating: z.int(),
    solution: z.array(z.string()),
    themes: z.array(z.string()),
  }),
});

type PuzzleAndGame = z.infer<typeof PuzzleAndGame>;

export { PuzzleAndGame };
export default PuzzleAndGame;
