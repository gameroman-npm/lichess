import * as z from "zod";

const Error = z.object({ error: z.string() });

type Error = z.infer<typeof Error>;

export { Error };
export default Error;
