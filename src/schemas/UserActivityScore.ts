import * as z from "zod";

const UserActivityScore = z.object({
  win: z.int(),
  loss: z.int(),
  draw: z.int(),
  rp: z.object({
    before: z.int(),
    after: z.int(),
  }),
});

type UserActivityScore = z.infer<typeof UserActivityScore>;

export { UserActivityScore };
export default UserActivityScore;
