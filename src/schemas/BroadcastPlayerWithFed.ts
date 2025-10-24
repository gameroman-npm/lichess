import * as z from "zod";

import Title from "./Title";

const BroadcastPlayerWithFed = z.object({
  name: z.string(),
  title: Title.optional(),
  rating: z.int().optional(),
  fideId: z.int().optional(),
  team: z.string().optional(),
  fed: z.string().optional(),
});

type BroadcastPlayerWithFed = z.infer<typeof BroadcastPlayerWithFed>;

export { BroadcastPlayerWithFed };
export default BroadcastPlayerWithFed;
