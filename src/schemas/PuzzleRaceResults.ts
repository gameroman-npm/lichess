import * as z from "zod";

import PatronColor from "./PatronColor";

const PuzzleRaceResults = z.object({
  id: z.string(),
  owner: z.string(),
  players: z.array(
    z.object({
      name: z.string(),
      score: z.int(),
      id: z.string().optional(),
      flair: z.string().optional(),
      patron: z.boolean().optional(),
      patronColor: PatronColor.optional(),
    })
  ),
  puzzles: z.array(
    z.object({
      id: z.string(),
      fen: z.string(),
      line: z.string(),
      rating: z.int(),
    })
  ),
  finishesAt: z.int(),
  startsAt: z.int(),
});

type PuzzleRaceResults = z.infer<typeof PuzzleRaceResults>;

export { PuzzleRaceResults };
export default PuzzleRaceResults;
