import * as z from "zod";

const BroadcastCustomPoints = z.number().min(0).max(10);

type BroadcastCustomPoints = z.infer<typeof BroadcastCustomPoints>;

export { BroadcastCustomPoints };
export default BroadcastCustomPoints;
