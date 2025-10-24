import * as z from "zod";

const GameStatusName = z.literal([
  "created",
  "started",
  "aborted",
  "mate",
  "resign",
  "stalemate",
  "timeout",
  "draw",
  "outoftime",
  "cheat",
  "noStart",
  "unknownFinish",
  "insufficientMaterialClaim",
  "variantEnd",
]);

type GameStatusName = z.infer<typeof GameStatusName>;

export { GameStatusName };
export default GameStatusName;
