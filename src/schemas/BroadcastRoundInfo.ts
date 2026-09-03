import * as z from "minizod";

import { BroadcastCustomScoring } from "./BroadcastCustomScoring";

const BroadcastRoundInfo = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.optional(z.int()),
  ongoing: z.optional(z.boolean()),
  startsAt: z.optional(z.int()),
  startsAfterPrevious: z.optional(z.boolean()),
  finishedAt: z.optional(z.int()),
  finished: z.optional(z.boolean()),
  url: z.url(),
  rated: z.optional(z.boolean()),
  customScoring: z.optional(BroadcastCustomScoring),
});

type BroadcastRoundInfo = z.infer<typeof BroadcastRoundInfo>;

export { BroadcastRoundInfo };
