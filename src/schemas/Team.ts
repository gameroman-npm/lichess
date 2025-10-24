import * as z from "zod";

import Flair from "./Flair";
import LightUser from "./LightUser";

const Team = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  flair: Flair.optional(),
  leader: LightUser.optional(),
  leaders: z.array(LightUser).optional(),
  nbMembers: z.int().optional(),
  open: z.boolean().optional(),
  joined: z.boolean().optional(),
  requested: z.boolean().optional(),
});

type Team = z.infer<typeof Team>;

export { Team };
export default Team;
