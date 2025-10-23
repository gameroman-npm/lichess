import * as z from "zod";

import BroadcastGroup from "./BroadcastGroup";
import BroadcastRoundGame from "./BroadcastRoundGame";
import BroadcastRoundInfo from "./BroadcastRoundInfo";
import BroadcastRoundStudyInfo from "./BroadcastRoundStudyInfo";
import BroadcastTour from "./BroadcastTour";

const BroadcastRound = z.object({
  round: BroadcastRoundInfo,
  tour: BroadcastTour,
  study: BroadcastRoundStudyInfo,
  games: z.array(BroadcastRoundGame),
  group: BroadcastGroup.optional(),
  isSubscribed: z.boolean().optional(),
});

type BroadcastRound = z.infer<typeof BroadcastRound>;

export { BroadcastRound };
export default BroadcastRound;
