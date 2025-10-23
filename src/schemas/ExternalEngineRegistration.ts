import * as z from "zod";

import UciVariant from "./UciVariant";

const ExternalEngineRegistration = z.object({
  name: z.string().min(3).max(200),
  maxThreads: z.int().min(1).max(65536),
  maxHash: z.int().min(1).max(1048576),
  variants: z.array(UciVariant).optional(),
  providerSecret: z.string().min(16).max(1024),
  providerData: z.string().optional(),
});

type ExternalEngineRegistration = z.infer<typeof ExternalEngineRegistration>;

export { ExternalEngineRegistration };
export default ExternalEngineRegistration;
