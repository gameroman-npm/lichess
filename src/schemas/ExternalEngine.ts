import * as z from "zod";

import UciVariant from "./UciVariant";

const ExternalEngine = z.object({
  id: z.string(),
  name: z.string().min(3).max(200),
  clientSecret: z.string(),
  userId: z.string(),
  maxThreads: z.int().min(1).max(65536),
  maxHash: z.int().min(1).max(1048576),
  variants: z.array(UciVariant),
  providerData: z.string().nullable().optional(),
});

type ExternalEngine = z.infer<typeof ExternalEngine>;

export { ExternalEngine };
export default ExternalEngine;
