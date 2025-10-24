import * as z from "zod";

const PerfType = z.literal([
  "ultraBullet",
  "bullet",
  "blitz",
  "rapid",
  "classical",
  "correspondence",
  "chess960",
  "crazyhouse",
  "antichess",
  "atomic",
  "horde",
  "kingOfTheHill",
  "racingKings",
  "threeCheck",
]);

type PerfType = z.infer<typeof PerfType>;

export { PerfType };
export default PerfType;
