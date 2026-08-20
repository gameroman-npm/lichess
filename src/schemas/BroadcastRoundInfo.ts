import * as z from "minizod";

import { BroadcastCustomScoring } from "./BroadcastCustomScoring";

const BroadcastRoundInfo = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.int(),
  rated: z.optional(z.boolean()),
  ongoing: z.optional(z.boolean()),
  startsAt: z.optional(z.int()),
  startsAfterPrevious: z.optional(z.boolean()),
  finishedAt: z.optional(z.int()),
  finished: z.optional(z.boolean()),
  url: z.url(),
  delay: z.optional(z.int()),
  customScoring: z.optional(BroadcastCustomScoring),
});

type BroadcastRoundInfo = z.infer<typeof BroadcastRoundInfo>;

export { BroadcastRoundInfo };
