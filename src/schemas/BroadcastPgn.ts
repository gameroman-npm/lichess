import * as z from "minizod";

const BroadcastPgn = z.string();

type BroadcastPgn = z.infer<typeof BroadcastPgn>;

export { BroadcastPgn };
