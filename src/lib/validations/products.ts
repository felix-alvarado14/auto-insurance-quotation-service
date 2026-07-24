import { z } from "zod";

export const productsQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, "Page must be greater than or equal to 1."),
  limit: z.coerce
    .number()
    .int()
    .min(1, "Limit must be greater than or equal to 1.")
    .max(100, "Limit must be less than or equal to 100."),
});

export type ProductsQueryInput = z.infer<typeof productsQuerySchema>;
