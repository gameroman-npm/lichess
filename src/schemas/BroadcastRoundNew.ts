import * as z from "zod";

import BroadcastRoundInfo from "./BroadcastRoundInfo";
import BroadcastRoundStudyInfo from "./BroadcastRoundStudyInfo";
import BroadcastTour from "./BroadcastTour";

const BroadcastRoundNew = z.object({
  round: BroadcastRoundInfo,
  tour: BroadcastTour,
  study: BroadcastRoundStudyInfo,
});

type BroadcastRoundNew = z.infer<typeof BroadcastRoundNew>;

export { BroadcastRoundNew };
export default BroadcastRoundNew;
