import * as z from "zod";

const UserActivityFollowList = z.object({
  ids: z.array(z.string()),
  nb: z.int().optional(),
});

type UserActivityFollowList = z.infer<typeof UserActivityFollowList>;

export { UserActivityFollowList };
export default UserActivityFollowList;
