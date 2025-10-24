import * as z from "zod";

const SwissStatus = z.literal(["created", "started", "finished"]);

type SwissStatus = z.infer<typeof SwissStatus>;

export { SwissStatus };
export default SwissStatus;
