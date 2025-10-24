import * as z from "zod";

import BroadcastWithLastRound from "./BroadcastWithLastRound";

const BroadcastTop = z.object({
  active: z.array(BroadcastWithLastRound).optional(),
  upcoming: z.array(BroadcastWithLastRound).optional(),
  past: z
    .object({
      currentPage: z.int().optional(),
      maxPerPage: z.int().optional(),
      currentPageResults: z.array(BroadcastWithLastRound).optional(),
      previousPage: z.int().nullable().optional(),
      nextPage: z.int().nullable().optional(),
    })
    .optional(),
});

type BroadcastTop = z.infer<typeof BroadcastTop>;

export { BroadcastTop };
export default BroadcastTop;
