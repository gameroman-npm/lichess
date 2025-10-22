import * as z from "zod";

import GameColor from "./GameColor";
import GameStatusId from "./GameStatusId";
import GameStatusName from "./GameStatusName";
import PerfType from "./PerfType";
import Speed from "./Speed";
import VariantKey from "./VariantKey";

const GameStreamGame = z.object({
  id: z.string(),
  rated: z.boolean().optional(),
  variant: VariantKey.optional(),
  speed: Speed.optional(),
  perf: PerfType.optional(),
  createdAt: z.int().optional(),
  status: GameStatusId.optional(),
  statusName: GameStatusName.optional(),
  clock: z
    .object({
      initial: z.int().optional(),
      increment: z.int().optional(),
      totalTime: z.int().optional(),
    })
    .optional(),
  players: z
    .object({
      white: z
        .object({
          userId: z.string().optional(),
          rating: z.int().optional(),
        })
        .optional(),
      black: z
        .object({
          userId: z.string().optional(),
          rating: z.int().optional(),
        })
        .optional(),
    })
    .optional(),
  winner: GameColor.optional(),
});

type GameStreamGame = z.infer<typeof GameStreamGame>;

export { GameStreamGame };
export default GameStreamGame;
