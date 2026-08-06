import * as z from "minizod";

import { TeamUpdatesByTeam } from "./TeamUpdatesByTeam";
import { TeamUpdatesPager } from "./TeamUpdatesPager";

const TeamUpdates = z.object({
  updates: TeamUpdatesPager,
  byTeam: TeamUpdatesByTeam,
});

type TeamUpdates = z.infer<typeof TeamUpdates>;

export { TeamUpdates };
