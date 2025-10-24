import * as z from "zod";

const Profile = z.object({
  flag: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  realName: z.string().optional(),
  fideRating: z.int().optional(),
  uscfRating: z.int().optional(),
  ecfRating: z.int().optional(),
  cfcRating: z.int().optional(),
  rcfRating: z.int().optional(),
  dsbRating: z.int().optional(),
  links: z.string().optional(),
});

type Profile = z.infer<typeof Profile>;

export { Profile };
export default Profile;
