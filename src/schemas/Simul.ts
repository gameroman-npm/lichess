import * as z from "zod";

import LightUser from "./LightUser";
import VariantKey from "./VariantKey";

const Simul = z.object({
  id: z.string(),
  host: z.intersection(
    LightUser,
    z.object({
      rating: z.int().optional(),
      provisional: z.boolean().optional(),
      gameId: z.string().optional(),
      online: z.boolean().optional(),
    })
  ),
  name: z.string(),
  fullName: z.string(),
  variants: z.array(
    z.object({
      key: VariantKey.optional(),
      icon: z.string().optional(),
      name: z.string().optional(),
    })
  ),
  isCreated: z.boolean(),
  isFinished: z.boolean(),
  isRunning: z.boolean(),
  text: z.string().optional(),
  estimatedStartAt: z.int().optional(),
  startedAt: z.int().optional(),
  finishedAt: z.int().optional(),
  nbApplicants: z.int(),
  nbPairings: z.int(),
});

type Simul = z.infer<typeof Simul>;

export { Simul };
export default Simul;
