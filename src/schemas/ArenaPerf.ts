import * as z from "zod";

import PerfType from "./PerfType";

const ArenaPerf = z.object({
  key: PerfType,
  name: z.string(),
  position: z.int(),
  icon: z.string().optional(),
});

type ArenaPerf = z.infer<typeof ArenaPerf>;

export { ArenaPerf };
export default ArenaPerf;
