import * as z from "zod";

const VariantKey = z.literal([
  "standard",
  "chess960",
  "crazyhouse",
  "antichess",
  "atomic",
  "horde",
  "kingOfTheHill",
  "racingKings",
  "threeCheck",
  "fromPosition",
]);

type VariantKey = z.infer<typeof VariantKey>;

export { VariantKey };
export default VariantKey;
