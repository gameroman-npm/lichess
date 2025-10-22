import * as z from "zod";

import PerfTop10 from "./PerfTop10";

const Top10s = z.object({
  bullet: PerfTop10,
  blitz: PerfTop10,
  rapid: PerfTop10,
  classical: PerfTop10,
  ultraBullet: PerfTop10,
  crazyhouse: PerfTop10,
  chess960: PerfTop10,
  kingOfTheHill: PerfTop10,
  threeCheck: PerfTop10,
  antichess: PerfTop10,
  atomic: PerfTop10,
  horde: PerfTop10,
  racingKings: PerfTop10,
});

type Top10s = z.infer<typeof Top10s>;

export { Top10s };
export default Top10s;
