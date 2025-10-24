import * as z from "zod";

const RatingHistoryEntry = z.object({
  name: z.string().optional(),
  points: z.array(z.tuple([z.int(), z.int(), z.int(), z.int()])).optional(),
});

type RatingHistoryEntry = z.infer<typeof RatingHistoryEntry>;

export { RatingHistoryEntry };
export default RatingHistoryEntry;
