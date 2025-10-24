import * as z from "zod";

import Title from "./Title";

const BroadcastRoundGame = z.object({
  id: z.string(),
  name: z.string(),
  fen: z.string().optional(),
  players: z
    .array(
      z.object({
        name: z.string().optional(),
        title: Title.optional(),
        rating: z.int().optional(),
        fideId: z.int().optional(),
        fed: z.string().optional(),
        clock: z.int().optional(),
      })
    )
    .optional(),
  lastMove: z.string().optional(),
  check: z.literal(["+", "#"]).optional(),
  thinkTime: z.int().optional(),
  status: z.literal(["*", "1-0", "0-1", "½-½"]).optional(),
});

type BroadcastRoundGame = z.infer<typeof BroadcastRoundGame>;

export { BroadcastRoundGame };
export default BroadcastRoundGame;
