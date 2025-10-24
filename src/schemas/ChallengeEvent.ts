import * as z from "zod";

import ChallengeJson from "./ChallengeJson";
import GameCompat from "./GameCompat";

const ChallengeEvent = z.object({
  type: z.literal("challenge"),
  challenge: ChallengeJson,
  compat: GameCompat.optional(),
});

type ChallengeEvent = z.infer<typeof ChallengeEvent>;

export { ChallengeEvent };
export default ChallengeEvent;
