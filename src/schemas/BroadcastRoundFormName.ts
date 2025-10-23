import * as z from "zod";

const BroadcastRoundFormName = z.string().min(3).max(80);

type BroadcastRoundFormName = z.infer<typeof BroadcastRoundFormName>;

export { BroadcastRoundFormName };
export default BroadcastRoundFormName;
