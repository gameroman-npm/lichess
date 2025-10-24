import * as z from "zod";

const StudyPgn = z.string();

type StudyPgn = z.infer<typeof StudyPgn>;

export { StudyPgn };
export default StudyPgn;
