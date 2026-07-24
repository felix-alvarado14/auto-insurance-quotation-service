import { z } from "zod";

export const verifyAuthSchema = z.object({
  identification: z.string().trim().min(1, "Identification is required."),
  password: z.string().min(1, "Password is required."),
});

export type VerifyAuthInput = z.infer<typeof verifyAuthSchema>;
