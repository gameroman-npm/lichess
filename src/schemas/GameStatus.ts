import * as z from "zod";

import GameStatusId from "./GameStatusId";
import GameStatusName from "./GameStatusName";

const GameStatus = z.object({
  id: GameStatusId,
  name: GameStatusName,
});

type GameStatus = z.infer<typeof GameStatus>;

export { GameStatus };
export default GameStatus;
