import * as z from "zod";

const ArenaSheet = z.object({
  scores: z.string(),
  fire: z.boolean().optional(),
});

type ArenaSheet = z.infer<typeof ArenaSheet>;

export { ArenaSheet };
export default ArenaSheet;
