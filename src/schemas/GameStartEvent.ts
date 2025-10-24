import * as z from "zod";

import GameEventInfo from "./GameEventInfo";

const GameStartEvent = z.object({
  type: z.literal("gameStart"),
  game: GameEventInfo,
});

type GameStartEvent = z.infer<typeof GameStartEvent>;

export { GameStartEvent };
export default GameStartEvent;
