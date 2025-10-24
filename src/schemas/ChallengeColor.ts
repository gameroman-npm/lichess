import * as z from "zod";

const ChallengeColor = z.literal(["white", "black", "random"]);

type ChallengeColor = z.infer<typeof ChallengeColor>;

export { ChallengeColor };
export default ChallengeColor;
