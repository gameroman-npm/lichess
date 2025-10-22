import * as z from "zod";

import LightUser from "./LightUser";

const UserNote = z.object({
  from: LightUser.optional(),
  to: LightUser.optional(),
  text: z.string().optional(),
  date: z.int().optional(),
});

type UserNote = z.infer<typeof UserNote>;

export { UserNote };
export default UserNote;
