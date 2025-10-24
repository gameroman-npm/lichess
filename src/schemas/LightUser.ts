import * as z from "zod";

import Flair from "./Flair";
import PatronColor from "./PatronColor";
import Title from "./Title";

const LightUser = z.object({
  id: z.string(),
  name: z.string(),
  flair: Flair.optional(),
  title: Title.optional(),
  patron: z.boolean().optional(),
  patronColor: PatronColor.optional(),
});

type LightUser = z.infer<typeof LightUser>;

export { LightUser };
export default LightUser;
