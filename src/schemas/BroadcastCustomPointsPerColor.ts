import * as z from "zod";

import BroadcastCustomPoints from "./BroadcastCustomPoints";

const BroadcastCustomPointsPerColor = z.object({
  win: BroadcastCustomPoints,
  draw: BroadcastCustomPoints,
});

type BroadcastCustomPointsPerColor = z.infer<typeof BroadcastCustomPointsPerColor>;

export { BroadcastCustomPointsPerColor };
export default BroadcastCustomPointsPerColor;
