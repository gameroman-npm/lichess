import * as z from "zod";

import Verdict from "./Verdict";

const Verdicts = z.object({
  accepted: z.boolean(),
  list: z.array(Verdict),
});

type Verdicts = z.infer<typeof Verdicts>;

export { Verdicts };
export default Verdicts;
