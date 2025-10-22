import * as z from "zod";

const GameEventOpponent = z.union([
  z.object({
    id: z.string(),
    username: z.string(),
    rating: z.int(),
    ratingDiff: z.int().optional(),
  }),
  z.object({
    id: z.null(),
    username: z.string(),
    ai: z.int(),
  }),
]);

type GameEventOpponent = z.infer<typeof GameEventOpponent>;

export { GameEventOpponent };
export default GameEventOpponent;
