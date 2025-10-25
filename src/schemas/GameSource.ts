import * as z from "zod";

const GameSource = z.literal([
  "lobby",
  "friend",
  "ai",
  "api",
  "tournament",
  "position",
  "import",
  "importlive",
  "simul",
  "relay",
  "pool",
  "arena",
  "swiss",
]);

type GameSource = z.infer<typeof GameSource>;

export { GameSource };
export default GameSource;
