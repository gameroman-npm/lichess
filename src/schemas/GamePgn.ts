import * as z from "zod";

const GamePgn = z.string();

type GamePgn = z.infer<typeof GamePgn>;

export { GamePgn };
export default GamePgn;
