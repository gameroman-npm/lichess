import * as z from "minizod";

import { GamePlayerAi } from "./GamePlayerAi";
import { GamePlayerUser } from "./GamePlayerUser";

const GamePlayers = z.object({
  white: z.union([GamePlayerUser, GamePlayerAi]),
  black: z.union([GamePlayerUser, GamePlayerAi]),
});

type GamePlayers = z.infer<typeof GamePlayers>;

export { GamePlayers };
