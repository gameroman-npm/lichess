import * as z from "zod";

const SwissUnauthorisedEdit = z.object({ error: z.string().optional() });

type SwissUnauthorisedEdit = z.infer<typeof SwissUnauthorisedEdit>;

export { SwissUnauthorisedEdit };
export default SwissUnauthorisedEdit;
