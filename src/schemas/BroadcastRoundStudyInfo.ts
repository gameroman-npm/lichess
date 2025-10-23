import * as z from "zod";

const BroadcastRoundStudyInfo = z.object({
  writeable: z.boolean().optional(),
  features: z
    .object({
      chat: z.boolean().optional(),
      computer: z.boolean().optional(),
      explorer: z.boolean().optional(),
    })
    .optional(),
});

type BroadcastRoundStudyInfo = z.infer<typeof BroadcastRoundStudyInfo>;

export { BroadcastRoundStudyInfo };
export default BroadcastRoundStudyInfo;
