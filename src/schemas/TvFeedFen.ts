import * as z from "zod";

const TvFeedFen = z.object({
  t: z.literal("fen"),
  d: z.object({
    fen: z.string(),
    lm: z.string(),
    wc: z.int(),
    bc: z.int(),
  }),
});

type TvFeedFen = z.infer<typeof TvFeedFen>;

export { TvFeedFen };
export default TvFeedFen;
