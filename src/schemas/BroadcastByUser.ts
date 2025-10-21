import * as z from "zod";

import BroadcastTour from "./BroadcastTour";

const BroadcastByUser = z.object({
  tour: BroadcastTour,
});

type BroadcastByUser = z.infer<typeof BroadcastByUser>;

export { BroadcastByUser };
export default BroadcastByUser;
