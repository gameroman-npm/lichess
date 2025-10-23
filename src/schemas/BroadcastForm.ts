import * as z from "zod";

import BroadcastTiebreakExtendedCode from "./BroadcastTiebreakExtendedCode";

const BroadcastForm = z.object({
  name: z.string().min(3).max(80),
  info: z.object({
  format: z.string().max(80).optional(),
  location: z.string().max(80).optional(),
  tc: z.string().max(80).optional(),
  fideTc: z.literal(["standard","rapid","blitz"]).optional(),
  timeZone: z.string().optional(),
  players: z.string().max(120).optional(),
  website: z.url().optional(),
  standings: z.url().optional(),
}).optional(),
  markdown: z.string().max(20000).optional(),
  showScores: z.boolean().optional(),
  showRatingDiffs: z.boolean().optional(),
  teamTable: z.boolean().optional(),
  visibility: z.literal(["public","unlisted","private"]).optional(),
  players: z.string().optional(),
  teams: z.string().optional(),
  tier: z.literal([3, 4, 5]).optional(),
  tiebreaks: z.array(BroadcastTiebreakExtendedCode).max(5).optional(),
});

type BroadcastForm = z.infer<typeof BroadcastForm>;

export { BroadcastForm };
export default BroadcastForm;
