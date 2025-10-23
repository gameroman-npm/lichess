import * as z from "zod";

import BroadcastRoundFormName from "./BroadcastRoundFormName";
import draw from "./draw";
import win from "./win";

const BroadcastRoundForm = z.intersection(
  z.union([
    z.object({ name: BroadcastRoundFormName }),
    z.object({
      name: BroadcastRoundFormName,
      syncUrl: z.url(),
      onlyRound: z.int().min(1).max(999).optional(),
      slices: z.string().optional(),
    }),
    z.object({
      name: BroadcastRoundFormName,
      syncUrls: z.string(),
      onlyRound: z.int().min(1).max(999).optional(),
      slices: z.string().optional(),
    }),
    z.object({
      name: BroadcastRoundFormName,
      syncIds: z.string(),
    }),
    z.object({
      name: BroadcastRoundFormName,
      syncUsers: z.string(),
    }),
  ]),
  z.object({
    startsAt: z.int().min(1356998400070).optional(),
    startsAfterPrevious: z.boolean().optional(),
    delay: z.int().min(0).max(3600).optional(),
    status: z.literal(["new", "started", "finished"]).optional(),
    rated: z.boolean().optional(),
    "customScoring.white.win": win.optional(),
    "customScoring.white.draw": draw.optional(),
    "customScoring.black.win": win.optional(),
    "customScoring.black.draw": draw.optional(),
    period: z.int().min(2).max(60).optional(),
  })
);

type BroadcastRoundForm = z.infer<typeof BroadcastRoundForm>;

export { BroadcastRoundForm };
export default BroadcastRoundForm;
