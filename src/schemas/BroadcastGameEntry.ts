import * as z from "zod";

import BroadcastCustomPoints from "./BroadcastCustomPoints";
import BroadcastPlayerWithFed from "./BroadcastPlayerWithFed";
import GameColor from "./GameColor";

const BroadcastGameEntry = z.object({
  round: z.string(),
  id: z.string(),
  opponent: BroadcastPlayerWithFed,
  color: GameColor,
  points: z.literal(["1", "1/2", "0"]).optional(),
  customPoints: BroadcastCustomPoints.optional(),
  ratingDiff: z.int().optional(),
});

type BroadcastGameEntry = z.infer<typeof BroadcastGameEntry>;

export { BroadcastGameEntry };
export default BroadcastGameEntry;
