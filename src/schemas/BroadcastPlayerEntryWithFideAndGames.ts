import * as z from "zod";

import BroadcastGameEntry from "./BroadcastGameEntry";
import BroadcastPlayerEntry from "./BroadcastPlayerEntry";

const BroadcastPlayerEntryWithFideAndGames = z.intersection(
  BroadcastPlayerEntry,
  z.object({
    fide: z
      .object({
        year: z.int().optional(),
        ratings: z
          .object({
            standard: z.int().optional(),
            rapid: z.int().optional(),
            blitz: z.int().optional(),
          })
          .optional(),
      })
      .optional(),
    games: z.array(BroadcastGameEntry).optional(),
  })
);

type BroadcastPlayerEntryWithFideAndGames = z.infer<
  typeof BroadcastPlayerEntryWithFideAndGames
>;

export { BroadcastPlayerEntryWithFideAndGames };
export default BroadcastPlayerEntryWithFideAndGames;
