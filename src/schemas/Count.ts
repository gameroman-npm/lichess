import * as z from "zod";

const Count = z.object({
  all: z.int(),
  rated: z.int(),
  ai: z.int(),
  draw: z.int(),
  drawH: z.int(),
  loss: z.int(),
  lossH: z.int(),
  win: z.int(),
  winH: z.int(),
  bookmark: z.int(),
  playing: z.int(),
  import: z.int(),
  me: z.int(),
});

type Count = z.infer<typeof Count>;

export { Count };
export default Count;
