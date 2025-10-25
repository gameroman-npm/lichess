import * as z from "zod";

import GameColor from "./GameColor";
import GameCompat from "./GameCompat";
import GameEventOpponent from "./GameEventOpponent";
import GameSource from "./GameSource";
import GameStatus from "./GameStatus";
import Speed from "./Speed";
import Variant from "./Variant";

const GameEventInfo = z.object({
  fullId: z.string(),
  gameId: z.string(),
  fen: z.string().optional(),
  color: GameColor.optional(),
  lastMove: z.string().optional(),
  source: GameSource.optional(),
  status: GameStatus.optional(),
  variant: Variant.optional(),
  speed: Speed.optional(),
  perf: z.string().optional(),
  rated: z.boolean().optional(),
  hasMoved: z.boolean().optional(),
  opponent: GameEventOpponent.optional(),
  isMyTurn: z.boolean().optional(),
  secondsLeft: z.int().optional(),
  winner: GameColor.optional(),
  ratingDiff: z.int().optional(),
  compat: GameCompat.optional(),
  id: z.string().optional(),
  tournamentId: z.string().optional(),
});

type GameEventInfo = z.infer<typeof GameEventInfo>;

export { GameEventInfo };
export default GameEventInfo;
