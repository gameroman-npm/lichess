import * as z from "zod";

const GameChat = z.array(
  z.object({
    text: z.string(),
    user: z.string(),
  })
);

type GameChat = z.infer<typeof GameChat>;

export { GameChat };
export default GameChat;
