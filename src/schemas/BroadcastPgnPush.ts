import * as z from "zod";

import BroadcastPgnPushTags from "./BroadcastPgnPushTags";

const BroadcastPgnPush = z.object({
  games: z.array(
    z.object({
      tags: BroadcastPgnPushTags,
      moves: z.int().optional(),
      error: z.string().optional(),
    })
  ),
});

type BroadcastPgnPush = z.infer<typeof BroadcastPgnPush>;

export { BroadcastPgnPush };
export default BroadcastPgnPush;
