import * as z from "zod";

const ArenaPosition = z.union([
  z.object({
    eco: z.string(),
    name: z.string(),
    fen: z.string(),
    url: z.url(),
  }),
  z.object({
    name: z.literal("Custom position"),
    fen: z.string(),
  }),
]);

type ArenaPosition = z.infer<typeof ArenaPosition>;

export { ArenaPosition };
export default ArenaPosition;
