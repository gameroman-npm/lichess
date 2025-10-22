import * as z from "zod";

import VariantKey from "./VariantKey";

const Variant = z.object({
  key: VariantKey,
  name: z.string(),
  short: z.string().optional(),
});

type Variant = z.infer<typeof Variant>;

export { Variant };
export default Variant;
