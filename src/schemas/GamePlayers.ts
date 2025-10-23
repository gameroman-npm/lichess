import * as z from "zod";

import GamePlayerUser from "./GamePlayerUser";

const GamePlayers = z.object({
  white: GamePlayerUser,
  black: GamePlayerUser,
});

type GamePlayers = z.infer<typeof GamePlayers>;

export { GamePlayers };
export default GamePlayers;
