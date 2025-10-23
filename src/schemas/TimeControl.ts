import * as z from "zod";

const TimeControl = z.union([
  z.object({
    type: z.literal("clock").optional(),
    limit: z.int().optional(),
    increment: z.int().optional(),
    show: z.string().optional(),
  }),
  z.object({
    type: z.literal("correspondence").optional(),
    daysPerTurn: z.int().optional(),
  }),
  z.object({ type: z.literal("unlimited").optional() }),
]);

type TimeControl = z.infer<typeof TimeControl>;

export { TimeControl };
export default TimeControl;
