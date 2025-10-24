import * as z from "zod";

import RatingHistoryEntry from "./RatingHistoryEntry";

const RatingHistory = z.array(RatingHistoryEntry);

type RatingHistory = z.infer<typeof RatingHistory>;

export { RatingHistory };
export default RatingHistory;
