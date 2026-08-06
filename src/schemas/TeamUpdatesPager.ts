import * as z from "minizod";

import { TeamUpdate } from "./TeamUpdate";

const TeamUpdatesPager = z.object({
  currentPage: z.int(),
  maxPerPage: z.int(),
  currentPageResults: z.array(TeamUpdate),
  previousPage: z.nullable(z.int()),
  nextPage: z.nullable(z.int()),
  nbResults: z.int(),
  nbPages: z.int(),
});

type TeamUpdatesPager = z.infer<typeof TeamUpdatesPager>;

export { TeamUpdatesPager };
