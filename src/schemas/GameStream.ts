import * as z from "zod";

import GameStreamGame from "./GameStreamGame";

const GameStream = z.array(GameStreamGame);

type GameStream = z.infer<typeof GameStream>;

export { GameStream };
export default GameStream;
