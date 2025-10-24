import * as z from "zod";

import TablebaseMove from "./TablebaseMove";

const TablebaseJson = z.object({
  category: z.literal([
    "win",
    "unknown",
    "syzygy-win",
    "maybe-win",
    "cursed-win",
    "draw",
    "blessed-loss",
    "maybe-loss",
    "syzygy-loss",
    "loss",
  ]),
  dtz: z.int().nullable().optional(),
  precise_dtz: z.int().nullable().optional(),
  dtc: z.int().nullable().optional(),
  dtm: z.int().nullable().optional(),
  dtw: z.int().nullable().optional(),
  checkmate: z.boolean().optional(),
  stalemate: z.boolean().optional(),
  variant_win: z.boolean().optional(),
  variant_loss: z.boolean().optional(),
  insufficient_material: z.boolean().optional(),
  moves: z.array(TablebaseMove),
});

type TablebaseJson = z.infer<typeof TablebaseJson>;

export { TablebaseJson };
export default TablebaseJson;
