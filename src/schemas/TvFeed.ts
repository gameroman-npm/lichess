import * as z from "zod";

import TvFeedFeatured from "./TvFeedFeatured";
import TvFeedFen from "./TvFeedFen";

const TvFeed = z.union([TvFeedFeatured, TvFeedFen]);

type TvFeed = z.infer<typeof TvFeed>;

export { TvFeed };
export default TvFeed;
