import * as z from "zod";

import BroadcastCustomPointsPerColor from "./BroadcastCustomPointsPerColor";

const BroadcastCustomScoring = z.object({
  white: BroadcastCustomPointsPerColor,
  black: BroadcastCustomPointsPerColor,
});

type BroadcastCustomScoring = z.infer<typeof BroadcastCustomScoring>;

export { BroadcastCustomScoring };
export default BroadcastCustomScoring;
