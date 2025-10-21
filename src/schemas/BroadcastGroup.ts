import * as z from "zod";

import BroadcastGroupTour from "./BroadcastGroupTour";

const BroadcastGroup = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  tours: z.array(BroadcastGroupTour),
});

type BroadcastGroup = z.infer<typeof BroadcastGroup>;

export { BroadcastGroup };
export default BroadcastGroup;
