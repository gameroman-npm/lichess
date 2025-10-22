import * as z from "zod";

const Flair = z.string().brand("Flair");

type Flair = z.infer<typeof Flair>;

export { Flair };
export default Flair;
