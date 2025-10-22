import * as z from "zod";

const StudyMetadata = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.int(),
  updatedAt: z.int(),
});

type StudyMetadata = z.infer<typeof StudyMetadata>;

export { StudyMetadata };
export default StudyMetadata;
