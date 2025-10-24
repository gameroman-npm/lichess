import * as z from "zod";

const Title = z.literal([
  "GM",
  "WGM",
  "IM",
  "WIM",
  "FM",
  "WFM",
  "NM",
  "CM",
  "WCM",
  "WNM",
  "LM",
  "BOT",
]);

type Title = z.infer<typeof Title>;

export { Title };
export default Title;
