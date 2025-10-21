import * as z from "zod";

import BroadcastRoundInfo from "./BroadcastRoundInfo";
import BroadcastRoundStudyInfo from "./BroadcastRoundStudyInfo";
import BroadcastTour from "./BroadcastTour";

const BroadcastMyRound = z.object({
  round: BroadcastRoundInfo,
  tour: BroadcastTour,
  study: BroadcastRoundStudyInfo,
});

type BroadcastMyRound = z.infer<typeof BroadcastMyRound>;

export { BroadcastMyRound };
export default BroadcastMyRound;
