import * as z from "zod";

const Crosstable = z.object({
  users: z.record(z.string(), z.number()),
  nbGames: z.int(),
});

type Crosstable = z.infer<typeof Crosstable>;

export { Crosstable };
export default Crosstable;
