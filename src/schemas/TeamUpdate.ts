import * as z from "minizod";

import { LightTeam } from "./LightTeam";
import { LightUser } from "./LightUser";

const TeamUpdate = z.object({
  msg: z.object({
    id: z.string(),
    date: z.int(),
    sender: LightUser,
    team: z.optional(LightTeam),
    text: z.string(),
  }),
  seen: z.boolean(),
});

type TeamUpdate = z.infer<typeof TeamUpdate>;

export { TeamUpdate };
