import * as z from "zod";

import LightUser from "./LightUser";

const BroadcastTour = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.int(),
  dates: z.array(z.int()).max(2).optional(),
  info: z
    .object({
      website: z.url().optional(),
      players: z.string().optional(),
      location: z.string().optional(),
      tc: z.string().optional(),
      fideTc: z.literal(["standard", "rapid", "blitz"]).optional(),
      timeZone: z.string().optional(),
      standings: z.url().optional(),
      format: z.string().optional(),
    })
    .optional(),
  tier: z.int().optional(),
  image: z.url().optional(),
  description: z.string().optional(),
  leaderboard: z.boolean().optional(),
  teamTable: z.boolean().optional(),
  url: z.url(),
  communityOwner: LightUser.optional(),
});

type BroadcastTour = z.infer<typeof BroadcastTour>;

export { BroadcastTour };
export default BroadcastTour;
