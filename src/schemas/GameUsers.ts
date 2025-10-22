import * as z from "zod";

import GameUser from "./GameUser";

const GameUsers = z.object({
  white: GameUser,
  black: GameUser,
});

type GameUsers = z.infer<typeof GameUsers>;

export { GameUsers };
export default GameUsers;
