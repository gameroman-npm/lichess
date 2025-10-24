import * as z from "zod";

const Move = z.object({
  uci: z.string().optional(),
  san: z.string().optional(),
  category: z
    .literal([
      "loss",
      "unknown",
      "syzygy-loss",
      "maybe-loss",
      "blessed-loss",
      "draw",
      "cursed-win",
      "maybe-win",
      "syzygy-win",
      "win",
    ])
    .optional(),
  dtz: z.int().nullable().optional(),
  precise_dtz: z.int().nullable().optional(),
  dtc: z.int().nullable().optional(),
  dtm: z.int().nullable().optional(),
  dtw: z.int().nullable().optional(),
  zeroing: z.boolean().optional(),
  checkmate: z.boolean().optional(),
  stalemate: z.boolean().optional(),
  variant_win: z.boolean().optional(),
  variant_loss: z.boolean().optional(),
  insufficient_material: z.boolean().optional(),
});

type Move = z.infer<typeof Move>;

export { Move };
export default Move;
