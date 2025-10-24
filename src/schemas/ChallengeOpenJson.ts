import * as z from "zod";

import ChallengeColor from "./ChallengeColor";
import ChallengeStatus from "./ChallengeStatus";
import GameColor from "./GameColor";
import Speed from "./Speed";
import TimeControl from "./TimeControl";
import Variant from "./Variant";

const ChallengeOpenJson = z.object({
  id: z.string(),
  url: z.url(),
  status: ChallengeStatus,
  challenger: z.null(),
  destUser: z.null(),
  variant: Variant,
  rated: z.boolean(),
  speed: Speed,
  timeControl: TimeControl,
  color: ChallengeColor,
  finalColor: GameColor.optional(),
  perf: z.object({
    icon: z.string().optional(),
    name: z.string().optional(),
  }),
  initialFen: z.string().optional(),
  urlWhite: z.url(),
  urlBlack: z.url(),
  open: z.object({ userIds: z.tuple([z.string(), z.string()]).optional() }),
});

type ChallengeOpenJson = z.infer<typeof ChallengeOpenJson>;

export { ChallengeOpenJson };
export default ChallengeOpenJson;
