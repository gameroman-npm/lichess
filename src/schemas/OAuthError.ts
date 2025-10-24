import * as z from "zod";

const OAuthError = z.object({
  error: z.string(),
  error_description: z.string().optional(),
});

type OAuthError = z.infer<typeof OAuthError>;

export { OAuthError };
export default OAuthError;
