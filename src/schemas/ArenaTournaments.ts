import * as z from "zod";

import ArenaTournament from "./ArenaTournament";

const ArenaTournaments = z.object({
  created: z.array(ArenaTournament),
  started: z.array(ArenaTournament),
  finished: z.array(ArenaTournament),
});

type ArenaTournaments = z.infer<typeof ArenaTournaments>;

export { ArenaTournaments };
export default ArenaTournaments;
