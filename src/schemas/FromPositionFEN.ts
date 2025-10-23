import * as z from "zod";

const FromPositionFEN = z.string();

type FromPositionFEN = z.infer<typeof FromPositionFEN>;

export { FromPositionFEN };
export default FromPositionFEN;
