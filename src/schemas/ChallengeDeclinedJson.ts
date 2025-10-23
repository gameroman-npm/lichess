import * as z from "zod";

import ChallengeJson from "./ChallengeJson";

const ChallengeDeclinedJson = z.intersection(
  ChallengeJson,
  z.object({
    declineReason: z.string(),
    declineReasonKey: z.literal([
      "generic",
      "later",
      "toofast",
      "tooslow",
      "timecontrol",
      "rated",
      "casual",
      "standard",
      "variant",
      "nobot",
      "onlybot",
    ]),
  })
);

type ChallengeDeclinedJson = z.infer<typeof ChallengeDeclinedJson>;

export { ChallengeDeclinedJson };
export default ChallengeDeclinedJson;
