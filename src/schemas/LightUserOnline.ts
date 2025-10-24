import * as z from "zod";

import LightUser from "./LightUser";

const LightUserOnline = z.intersection(
  LightUser,
  z.object({ online: z.boolean().optional() })
);

type LightUserOnline = z.infer<typeof LightUserOnline>;

export { LightUserOnline };
export default LightUserOnline;
