import * as z from "zod";

const GameChat = z.array(
  z.object({
    text: z.string().optional(),
    user: z.string().optional(),
  })
);

type GameChat = z.infer<typeof GameChat>;

export { GameChat };
export default GameChat;
