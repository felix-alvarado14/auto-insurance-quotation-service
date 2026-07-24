import { z } from "zod";

/**
 * Client-side validation schema for login form
 * Mirrors the backend schema for consistency
 */
export const loginFormSchema = z.object({
  identification: z
    .string()
    .min(1, "El usuario es requerido.")
    .trim(),
  password: z
    .string()
    .min(1, "La contraseña es requerida."),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
