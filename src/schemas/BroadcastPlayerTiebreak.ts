import * as z from "zod";

import BroadcastTiebreakExtendedCode from "./BroadcastTiebreakExtendedCode";

const BroadcastPlayerTiebreak = z.object({
  extendedCode: BroadcastTiebreakExtendedCode,
  description: z.string(),
  points: z.number(),
});

type BroadcastPlayerTiebreak = z.infer<typeof BroadcastPlayerTiebreak>;

export { BroadcastPlayerTiebreak };
export default BroadcastPlayerTiebreak;
