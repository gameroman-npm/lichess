import * as z from "zod";

const UserStreamer = z.object({
  twitch: z.object({ channel: z.url().optional() }).optional(),
  youTube: z.object({ channel: z.url().optional() }).optional(),
});

type UserStreamer = z.infer<typeof UserStreamer>;

export { UserStreamer };
export default UserStreamer;
