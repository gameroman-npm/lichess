import * as z from "zod";

const NotFound = z.object({ error: z.string() });

type NotFound = z.infer<typeof NotFound>;

export { NotFound };
export default NotFound;
