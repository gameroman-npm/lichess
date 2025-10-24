import * as z from "zod";

import BroadcastRoundInfo from "./BroadcastRoundInfo";
import BroadcastTour from "./BroadcastTour";

const BroadcastWithLastRound = z.object({
  group: z.string().optional(),
  tour: BroadcastTour.optional(),
  round: BroadcastRoundInfo.optional(),
});

type BroadcastWithLastRound = z.infer<typeof BroadcastWithLastRound>;

export { BroadcastWithLastRound };
export default BroadcastWithLastRound;
