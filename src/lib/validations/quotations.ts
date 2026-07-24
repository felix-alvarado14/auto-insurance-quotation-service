import { z } from "zod";

export const quotationCreateSchema = z
  .object({
    productId: z.coerce.number().int().positive({ message: "Product ID must be greater than zero." }),
    vehicleYear: z
      .coerce.number()
      .int({ message: "Vehicle year must be an integer." })
      .min(1980, { message: "Vehicle year must be at least 1980." })
      .max(new Date().getFullYear() + 1, {
        message: "Vehicle year must be at most next year.",
      }),
    vehicleBrand: z.string().trim().min(1, { message: "Vehicle brand is required." }).max(50, {
      message: "Vehicle brand must be at most 50 characters.",
    }),
    vehicleModel: z.string().trim().min(1, { message: "Vehicle model is required." }).max(50, {
      message: "Vehicle model must be at most 50 characters.",
    }),
    vehicleValue: z.coerce.number().positive({ message: "Vehicle value must be greater than zero." }),
  })
  .strict();

export type QuotationCreateInput = z.infer<typeof quotationCreateSchema>;
