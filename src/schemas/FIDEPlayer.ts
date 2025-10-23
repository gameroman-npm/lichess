import * as z from "zod";

import Title from "./Title";

const FIDEPlayer = z.object({
  id: z.int(),
  name: z.string(),
  title: Title.optional(),
  federation: z.string(),
  year: z.int().nullable().optional(),
  inactive: z.int().optional(),
  standard: z.int().optional(),
  rapid: z.int().optional(),
  blitz: z.int().optional(),
});

type FIDEPlayer = z.infer<typeof FIDEPlayer>;

export { FIDEPlayer };
export default FIDEPlayer;
