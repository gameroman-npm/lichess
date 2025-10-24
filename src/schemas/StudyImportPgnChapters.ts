import * as z from "zod";

const StudyImportPgnChapters = z.object({
  chapters: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        players: z
          .tuple([
            z.object({
              name: z.string().nullable().optional(),
              rating: z.int().optional(),
            }),
            z.object({
              name: z.string().nullable().optional(),
              rating: z.int().optional(),
            }),
          ])
          .optional(),
        status: z.string().optional(),
      })
    )
    .optional(),
});

type StudyImportPgnChapters = z.infer<typeof StudyImportPgnChapters>;

export { StudyImportPgnChapters };
export default StudyImportPgnChapters;
