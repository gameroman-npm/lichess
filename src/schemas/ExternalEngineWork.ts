import * as z from "zod";

import ExternalEngineWorkCommon from "./ExternalEngineWorkCommon";

const ExternalEngineWork = z.union([
  z.intersection(
    z.object({ movetime: z.int().min(1) }),
    ExternalEngineWorkCommon
  ),
  z.intersection(z.object({ depth: z.int().min(1) }), ExternalEngineWorkCommon),
  z.intersection(z.object({ nodes: z.int().min(1) }), ExternalEngineWorkCommon),
]);

type ExternalEngineWork = z.infer<typeof ExternalEngineWork>;

export { ExternalEngineWork };
export default ExternalEngineWork;
