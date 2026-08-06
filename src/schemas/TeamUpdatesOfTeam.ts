import * as z from "minizod";

import { LightTeam } from "./LightTeam";
import { TeamUpdatesByTeam } from "./TeamUpdatesByTeam";
import { TeamUpdatesPager } from "./TeamUpdatesPager";

const TeamUpdatesOfTeam = z.object({
  team: LightTeam,
  subscribed: z.boolean(),
  updates: TeamUpdatesPager,
  byTeam: TeamUpdatesByTeam,
});

type TeamUpdatesOfTeam = z.infer<typeof TeamUpdatesOfTeam>;

export { TeamUpdatesOfTeam };
