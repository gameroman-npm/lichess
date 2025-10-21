import * as z from "zod";

import ArenaTournament from "./ArenaTournament";

const ArenaTournaments = z.object({
  created: z.array(ArenaTournament).optional(),
  started: z.array(ArenaTournament).optional(),
  finished: z.array(ArenaTournament).optional(),
});

type ArenaTournaments = z.infer<typeof ArenaTournaments>;

export { ArenaTournaments };
export default ArenaTournaments;
