import * as z from "zod";

const OpponentGoneEvent = z.object({
  type: z.literal("opponentGone"),
  gone: z.boolean(),
  claimWinInSeconds: z.int().optional(),
});

type OpponentGoneEvent = z.infer<typeof OpponentGoneEvent>;

export { OpponentGoneEvent };
export default OpponentGoneEvent;
