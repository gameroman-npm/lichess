import * as z from "zod";

import Count from "./Count";
import User from "./User";
import UserStreamer from "./UserStreamer";

const UserExtended = z.intersection(
  User,
  z.object({
    url: z.url(),
    playing: z.url().optional(),
    count: Count.optional(),
    streaming: z.boolean().optional(),
    streamer: UserStreamer.optional(),
    followable: z.boolean().optional(),
    following: z.boolean().optional(),
    blocking: z.boolean().optional(),
  })
);

type UserExtended = z.infer<typeof UserExtended>;

export { UserExtended };
export default UserExtended;
