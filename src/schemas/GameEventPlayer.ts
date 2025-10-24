import * as z from "zod";

import Title from "./Title";

const GameEventPlayer = z.object({
  aiLevel: z.int().optional(),
  id: z.string(),
  name: z.string(),
  title: z.union([Title, z.null()]).optional(),
  rating: z.int().optional(),
  provisional: z.boolean().optional(),
});

type GameEventPlayer = z.infer<typeof GameEventPlayer>;

export { GameEventPlayer };
export default GameEventPlayer;
