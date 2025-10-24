import * as z from "zod";

import ArenaTournament from "./ArenaTournament";
import ArenaTournamentPlayer from "./ArenaTournamentPlayer";

const ArenaTournamentPlayed = z.object({
  tournament: ArenaTournament,
  player: ArenaTournamentPlayer,
});

type ArenaTournamentPlayed = z.infer<typeof ArenaTournamentPlayed>;

export { ArenaTournamentPlayed };
export default ArenaTournamentPlayed;
