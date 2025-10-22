import * as z from "zod";

import GameEventPlayer from "./GameEventPlayer";
import GameStateEvent from "./GameStateEvent";
import Speed from "./Speed";
import Variant from "./Variant";

const GameFullEvent = z.object({
  type: z.literal("gameFull"),
  id: z.string(),
  variant: Variant,
  clock: z
    .object({
      initial: z.int().optional(),
      increment: z.int().optional(),
    })
    .optional(),
  speed: Speed,
  perf: z.object({ name: z.string().optional() }),
  rated: z.boolean(),
  createdAt: z.int(),
  white: GameEventPlayer,
  black: GameEventPlayer,
  initialFen: z.string(),
  state: GameStateEvent,
  daysPerTurn: z.int().optional(),
  tournamentId: z.string().optional(),
});

type GameFullEvent = z.infer<typeof GameFullEvent>;

export { GameFullEvent };
export default GameFullEvent;
