import * as z from "zod";

import Perf from "./Perf";
import PuzzleModePerf from "./PuzzleModePerf";

const Perfs = z.object({
  chess960: Perf.optional(),
  atomic: Perf.optional(),
  racingKings: Perf.optional(),
  ultraBullet: Perf.optional(),
  blitz: Perf.optional(),
  kingOfTheHill: Perf.optional(),
  threeCheck: Perf.optional(),
  antichess: Perf.optional(),
  crazyhouse: Perf.optional(),
  bullet: Perf.optional(),
  correspondence: Perf.optional(),
  horde: Perf.optional(),
  puzzle: Perf.optional(),
  classical: Perf.optional(),
  rapid: Perf.optional(),
  storm: PuzzleModePerf.optional(),
  racer: PuzzleModePerf.optional(),
  streak: PuzzleModePerf.optional(),
});

type Perfs = z.infer<typeof Perfs>;

export { Perfs };
export default Perfs;
