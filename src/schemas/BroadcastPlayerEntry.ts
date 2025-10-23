import * as z from "zod";

import BroadcastPlayerTiebreak from "./BroadcastPlayerTiebreak";
import BroadcastPlayerWithFed from "./BroadcastPlayerWithFed";

const BroadcastPlayerEntry = z.intersection([
  BroadcastPlayerWithFed,
  z.object({
    score: z.number().optional(),
    played: z.int().optional(),
    ratingDiff: z.int().optional(),
    performance: z.int().optional(),
    tiebreaks: z.array(BroadcastPlayerTiebreak).max(5).optional(),
    rank: z.int().min(1).optional(),
  }),
]);

type BroadcastPlayerEntry = z.infer<typeof BroadcastPlayerEntry>;

export { BroadcastPlayerEntry };
export default BroadcastPlayerEntry;
