import * as z from "zod";

const TeamRequest = z.object({
  teamId: z.string(),
  userId: z.string(),
  date: z.int(),
  message: z.string().optional(),
});

type TeamRequest = z.infer<typeof TeamRequest>;

export { TeamRequest };
export default TeamRequest;
