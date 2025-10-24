import * as z from "zod";

const OpeningExplorerGamePlayer = z.object({
  name: z.string(),
  rating: z.int(),
});

type OpeningExplorerGamePlayer = z.infer<typeof OpeningExplorerGamePlayer>;

export { OpeningExplorerGamePlayer };
export default OpeningExplorerGamePlayer;
