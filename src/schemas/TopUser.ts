import * as z from "zod";

import Title from "./Title";

const TopUser = z.object({
  id: z.string(),
  username: z.string(),
  perfs: z
    .record(
      z.string(),
      z.object({
        rating: z.int(),
        progress: z.int(),
      })
    )
    .optional(),
  title: Title.optional(),
  patron: z.boolean().optional(),
  online: z.boolean().optional(),
});

type TopUser = z.infer<typeof TopUser>;

export { TopUser };
export default TopUser;
