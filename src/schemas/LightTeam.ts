import * as z from "minizod";

import { Flair } from "./Flair";

const LightTeam = z.object({
  id: z.string(),
  name: z.string(),
  flair: z.optional(Flair),
});

type LightTeam = z.infer<typeof LightTeam>;

export { LightTeam };
