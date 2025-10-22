import * as z from "zod";

const ChallengeStatus = z.literal([
  "created",
  "offline",
  "canceled",
  "declined",
  "accepted",
]);

type ChallengeStatus = z.infer<typeof ChallengeStatus>;

export { ChallengeStatus };
export default ChallengeStatus;
