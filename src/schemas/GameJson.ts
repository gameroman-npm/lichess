import * as z from "zod";

import GameColor from "./GameColor";
import GameMoveAnalysis from "./GameMoveAnalysis";
import GameOpening from "./GameOpening";
import GameStatusName from "./GameStatusName";
import GameUsers from "./GameUsers";
import Speed from "./Speed";
import VariantKey from "./VariantKey";

const GameJson = z.object({
  id: z.string(),
  rated: z.boolean(),
  variant: VariantKey,
  speed: Speed,
  perf: z.string(),
  createdAt: z.int(),
  lastMoveAt: z.int(),
  status: GameStatusName,
  source: z.string().optional(),
  players: GameUsers,
  initialFen: z.string().optional(),
  winner: GameColor.optional(),
  opening: GameOpening.optional(),
  moves: z.string().optional(),
  pgn: z.string().optional(),
  daysPerTurn: z.int().optional(),
  analysis: z.array(GameMoveAnalysis).optional(),
  tournament: z.string().optional(),
  swiss: z.string().optional(),
  clock: z
    .object({
      initial: z.int(),
      increment: z.int(),
      totalTime: z.int(),
    })
    .optional(),
  clocks: z.array(z.int()).optional(),
  division: z
    .object({
      middle: z.int().optional(),
      end: z.int().optional(),
    })
    .optional(),
});

type GameJson = z.infer<typeof GameJson>;

export { GameJson };
export default GameJson;
