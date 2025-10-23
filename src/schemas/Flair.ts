import * as z from "zod";

const Flair = z.string();

type Flair = z.infer<typeof Flair>;

export { Flair };
export default Flair;
