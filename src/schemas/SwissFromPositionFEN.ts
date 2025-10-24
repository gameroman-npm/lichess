import * as z from "zod";

const SwissFromPositionFEN = z.string();

type SwissFromPositionFEN = z.infer<typeof SwissFromPositionFEN>;

export { SwissFromPositionFEN };
export default SwissFromPositionFEN;
