import * as z from "zod";

import GameColor from "./GameColor";
import GamePlayers from "./GamePlayers";
import GameSource from "./GameSource";
import GameStatus from "./GameStatus";
import PerfType from "./PerfType";
import Speed from "./Speed";
import Variant from "./Variant";

const MoveStreamEntry = z.union([
  z.object({
    id: z.string(),
    variant: Variant.optional(),
    speed: Speed.optional(),
    perf: PerfType.optional(),
    rated: z.boolean().optional(),
    initialFen: z.string().optional(),
    fen: z.string().optional(),
    player: GameColor.optional(),
    turns: z.int().optional(),
    startedAtTurn: z.int().optional(),
    source: GameSource.optional(),
    status: GameStatus.optional(),
    createdAt: z.int().optional(),
    lastMove: z.string().optional(),
    players: GamePlayers.optional(),
  }),
  z.object({
    fen: z.string(),
    lm: z.string().optional(),
    wc: z.int(),
    bc: z.int(),
  }),
]);

type MoveStreamEntry = z.infer<typeof MoveStreamEntry>;

export { MoveStreamEntry };
export default MoveStreamEntry;
