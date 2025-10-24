import * as z from "zod";

import GameColor from "./GameColor";
import OpeningExplorerGamePlayer from "./OpeningExplorerGamePlayer";
import Speed from "./Speed";

const OpeningExplorerLichessGame = z.object({
  id: z.string(),
  winner: z.union([GameColor, z.null()]),
  speed: Speed.optional(),
  white: OpeningExplorerGamePlayer,
  black: OpeningExplorerGamePlayer,
  year: z.number(),
  month: z.string().nullable(),
});

type OpeningExplorerLichessGame = z.infer<typeof OpeningExplorerLichessGame>;

export { OpeningExplorerLichessGame };
export default OpeningExplorerLichessGame;
