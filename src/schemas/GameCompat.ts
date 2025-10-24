import * as z from "zod";

const GameCompat = z.object({
  bot: z.boolean().optional(),
  board: z.boolean().optional(),
});

type GameCompat = z.infer<typeof GameCompat>;

export { GameCompat };
export default GameCompat;
