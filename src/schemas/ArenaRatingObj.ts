import * as z from "zod";

import PerfType from "./PerfType";

const ArenaRatingObj = z.object({
  perf: PerfType.optional(),
  rating: z.int(),
});

type ArenaRatingObj = z.infer<typeof ArenaRatingObj>;

export { ArenaRatingObj };
export default ArenaRatingObj;
