import { z } from "zod";

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
