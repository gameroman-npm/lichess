import * as z from "zod";

const Verdict = z.object({
  condition: z.string(),
  verdict: z.string(),
});

type Verdict = z.infer<typeof Verdict>;

export { Verdict };
export default Verdict;
