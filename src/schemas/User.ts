import * as z from "zod";

import Flair from "./Flair";
import PatronColor from "./PatronColor";
import Perfs from "./Perfs";
import PlayTime from "./PlayTime";
import Profile from "./Profile";
import Title from "./Title";

const User = z.object({
  id: z.string(),
  username: z.string(),
  perfs: Perfs.optional(),
  title: Title.optional(),
  flair: Flair.optional(),
  createdAt: z.int().optional(),
  disabled: z.boolean().optional(),
  tosViolation: z.boolean().optional(),
  profile: Profile.optional(),
  seenAt: z.int().optional(),
  playTime: PlayTime.optional(),
  patron: z.boolean().optional(),
  patronColor: PatronColor.optional(),
  verified: z.boolean().optional(),
});

type User = z.infer<typeof User>;

export { User };
export default User;
