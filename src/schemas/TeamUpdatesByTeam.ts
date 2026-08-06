import * as z from "minizod";

import { LightTeam } from "./LightTeam";

const TeamUpdatesByTeam = z.array(
  z.object({
    team: LightTeam,
    last: z.number(),
    unread: z.int(),
  }),
);

type TeamUpdatesByTeam = z.infer<typeof TeamUpdatesByTeam>;

export { TeamUpdatesByTeam };
