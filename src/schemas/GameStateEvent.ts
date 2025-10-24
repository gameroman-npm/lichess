import * as z from "zod";

import GameColor from "./GameColor";
import GameStatusName from "./GameStatusName";

const GameStateEvent = z.object({
  type: z.literal("gameState"),
  moves: z.string(),
  wtime: z.int(),
  btime: z.int(),
  winc: z.int(),
  binc: z.int(),
  status: GameStatusName,
  winner: GameColor.optional(),
  wdraw: z.boolean().optional(),
  bdraw: z.boolean().optional(),
  wtakeback: z.boolean().optional(),
  btakeback: z.boolean().optional(),
});

type GameStateEvent = z.infer<typeof GameStateEvent>;

export { GameStateEvent };
export default GameStateEvent;
