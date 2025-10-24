import * as z from "zod";

const TablebaseMove = z.object({
  uci: z.string(),
  san: z.string(),
  category: z.literal([
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
  ]),
  dtz: z.int().nullable().optional(),
  precise_dtz: z.int().nullable().optional(),
  dtc: z.int().nullable().optional(),
  dtm: z.int().nullable().optional(),
  dtw: z.int().nullable().optional(),
  zeroing: z.boolean().optional(),
  conversion: z.boolean().optional(),
  checkmate: z.boolean().optional(),
  stalemate: z.boolean().optional(),
  variant_win: z.boolean().optional(),
  variant_loss: z.boolean().optional(),
  insufficient_material: z.boolean().optional(),
});

type TablebaseMove = z.infer<typeof TablebaseMove>;

export { TablebaseMove };
export default TablebaseMove;
