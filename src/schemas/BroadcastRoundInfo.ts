import * as z from "zod";

import BroadcastCustomScoring from "./BroadcastCustomScoring";

const BroadcastRoundInfo = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.int(),
  rated: z.boolean(),
  ongoing: z.boolean().optional(),
  startsAt: z.int().optional(),
  startsAfterPrevious: z.boolean().optional(),
  finishedAt: z.int().optional(),
  finished: z.boolean().optional(),
  url: z.url(),
  delay: z.int().optional(),
  customScoring: BroadcastCustomScoring.optional(),
});

type BroadcastRoundInfo = z.infer<typeof BroadcastRoundInfo>;

export { BroadcastRoundInfo };
export default BroadcastRoundInfo;
