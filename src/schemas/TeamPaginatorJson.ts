import * as z from "zod";

import Team from "./Team";

const TeamPaginatorJson = z.object({
  currentPage: z.int(),
  maxPerPage: z.int(),
  currentPageResults: z.array(Team),
  previousPage: z.int().nullable(),
  nextPage: z.int().nullable(),
  nbResults: z.int(),
  nbPages: z.int(),
});

type TeamPaginatorJson = z.infer<typeof TeamPaginatorJson>;

export { TeamPaginatorJson };
export default TeamPaginatorJson;
