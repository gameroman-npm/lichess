import * as z from "zod";

const BroadcastGroupTour = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
  live: z.boolean(),
});

type BroadcastGroupTour = z.infer<typeof BroadcastGroupTour>;

export { BroadcastGroupTour };
export default BroadcastGroupTour;
