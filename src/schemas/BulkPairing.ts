import * as z from "zod";

import Clock from "./Clock";
import VariantKey from "./VariantKey";

const BulkPairing = z.object({
  id: z.string(),
  games: z.array(
    z.object({
      id: z.string().optional(),
      black: z.string().optional(),
      white: z.string().optional(),
    })
  ),
  variant: VariantKey,
  clock: Clock,
  pairAt: z.int(),
  pairedAt: z.int().nullable(),
  rated: z.boolean(),
  startClocksAt: z.int(),
  scheduledAt: z.int(),
});

type BulkPairing = z.infer<typeof BulkPairing>;

export { BulkPairing };
export default BulkPairing;
