import * as z from "zod";

import MoveStreamEntry from "./MoveStreamEntry";

const MoveStream = z.array(MoveStreamEntry);

type MoveStream = z.infer<typeof MoveStream>;

export { MoveStream };
export default MoveStream;
