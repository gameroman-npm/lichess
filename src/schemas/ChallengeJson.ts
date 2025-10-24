import * as z from "zod";

import ChallengeColor from "./ChallengeColor";
import ChallengeStatus from "./ChallengeStatus";
import ChallengeUser from "./ChallengeUser";
import GameColor from "./GameColor";
import Speed from "./Speed";
import TimeControl from "./TimeControl";
import Variant from "./Variant";

const ChallengeJson = z.object({
  id: z.string(),
  url: z.url(),
  status: ChallengeStatus,
  challenger: ChallengeUser,
  destUser: z.union([ChallengeUser, z.null()]),
  variant: Variant,
  rated: z.boolean(),
  speed: Speed,
  timeControl: TimeControl,
  color: ChallengeColor,
  finalColor: GameColor.optional(),
  perf: z.object({
    icon: z.string(),
    name: z.string(),
  }),
  direction: z.literal(["in", "out"]).optional(),
  initialFen: z.string().optional(),
  rematchOf: z.string().optional(),
});

type ChallengeJson = z.infer<typeof ChallengeJson>;

export { ChallengeJson };
export default ChallengeJson;
