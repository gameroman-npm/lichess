import * as z from "zod";

const GameColor = z.literal(["white", "black"]);

type GameColor = z.infer<typeof GameColor>;

export { GameColor };
export default GameColor;
