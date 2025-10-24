import * as z from "zod";

const UciVariant = z.literal([
  "chess",
  "crazyhouse",
  "antichess",
  "atomic",
  "horde",
  "kingofthehill",
  "racingkings",
  "3check",
]);

type UciVariant = z.infer<typeof UciVariant>;

export { UciVariant };
export default UciVariant;
