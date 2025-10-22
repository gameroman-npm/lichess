import * as z from "zod";

const PlayTime = z.object({
  total: z.int(),
  tv: z.int(),
});

type PlayTime = z.infer<typeof PlayTime>;

export { PlayTime };
export default PlayTime;
