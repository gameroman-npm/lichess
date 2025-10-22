import * as z from "zod";

const GameStatusId = z.literal([
  10, 20, 25, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 60,
]);

type GameStatusId = z.infer<typeof GameStatusId>;

export { GameStatusId };
export default GameStatusId;
