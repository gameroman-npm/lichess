import * as z from "minizod";

const TimeControl = z.union([
  z.object({
    type: z.literal("clock"),
    limit: z.optional(z.int()),
    increment: z.optional(z.int()),
    show: z.optional(z.string()),
  }),
  z.object({
    type: z.literal("correspondence"),
    daysPerTurn: z.optional(z.int()),
  }),
  z.object({ type: z.literal("unlimited") }),
]);

type TimeControl = z.infer<typeof TimeControl>;

export { TimeControl };
