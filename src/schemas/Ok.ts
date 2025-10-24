import * as z from "zod";

const Ok = z.object({ ok: z.boolean() });

type Ok = z.infer<typeof Ok>;

export { Ok };
export default Ok;
