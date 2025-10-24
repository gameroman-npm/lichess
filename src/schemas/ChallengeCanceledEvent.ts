import * as z from "zod";

import ChallengeJson from "./ChallengeJson";

const ChallengeCanceledEvent = z.object({
  type: z.literal("challengeCanceled"),
  challenge: ChallengeJson,
});

type ChallengeCanceledEvent = z.infer<typeof ChallengeCanceledEvent>;

export { ChallengeCanceledEvent };
export default ChallengeCanceledEvent;
