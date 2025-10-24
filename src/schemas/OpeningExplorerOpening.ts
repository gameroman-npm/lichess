import * as z from "zod";

const OpeningExplorerOpening = z.object({
  eco: z.string(),
  name: z.string(),
});

type OpeningExplorerOpening = z.infer<typeof OpeningExplorerOpening>;

export { OpeningExplorerOpening };
export default OpeningExplorerOpening;
