import * as z from "zod";

const ArenaTournamentPlayer = z.object({
  games: z.int(),
  score: z.int(),
  rank: z.int(),
  performance: z.int().optional(),
});

type ArenaTournamentPlayer = z.infer<typeof ArenaTournamentPlayer>;

export { ArenaTournamentPlayer };
export default ArenaTournamentPlayer;
