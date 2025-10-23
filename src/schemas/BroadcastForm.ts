import * as z from "zod";

import BroadcastTiebreakExtendedCode from "./BroadcastTiebreakExtendedCode";

const BroadcastForm = z.object({
  name: z.string().min(3).max(80),
  "info.format": z.string().max(80).optional(),
  "info.location": z.string().max(80).optional(),
  "info.tc": z.string().max(80).optional(),
  "info.fideTc": z.literal(["standard", "rapid", "blitz"]).optional(),
  "info.timeZone": z.string().optional(),
  "info.players": z.string().max(120).optional(),
  "info.website": z.url().optional(),
  "info.standings": z.url().optional(),
  markdown: z.string().max(20000).optional(),
  showScores: z.boolean().optional(),
  showRatingDiffs: z.boolean().optional(),
  teamTable: z.boolean().optional(),
  visibility: z.literal(["public", "unlisted", "private"]).optional(),
  players: z.string().optional(),
  teams: z.string().optional(),
  tier: z.literal([3, 4, 5]).optional(),
  "tiebreaks[]": z.array(BroadcastTiebreakExtendedCode).max(5).optional(),
});

type BroadcastForm = z.infer<typeof BroadcastForm>;

export { BroadcastForm };
export default BroadcastForm;
