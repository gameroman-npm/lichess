import * as z from "zod";

const ArenaStatusName = z.literal(["created", "started", "finished"]);

type ArenaStatusName = z.infer<typeof ArenaStatusName>;

export { ArenaStatusName };
export default ArenaStatusName;
