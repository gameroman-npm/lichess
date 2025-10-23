import * as z from "zod";

import UciVariant from "./UciVariant";

const ExternalEngineWorkCommon = z.object({
  sessionId: z.string(),
  threads: z.int().min(1),
  hash: z.int().min(1),
  multiPv: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  variant: UciVariant,
  initialFen: z.string(),
  moves: z.array(z.string()),
});

type ExternalEngineWorkCommon = z.infer<typeof ExternalEngineWorkCommon>;

export { ExternalEngineWorkCommon };
export default ExternalEngineWorkCommon;
