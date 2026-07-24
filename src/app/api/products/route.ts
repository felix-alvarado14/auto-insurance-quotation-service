import { ZodError } from "zod";

import { productsQuerySchema } from "@/lib/validations/products";
import { getProducts } from "@/services/product.service";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const input = productsQuerySchema.parse(query);

    const result = await getProducts(input);

    return successResponse(result, result.message, 200);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        "Invalid query parameters.",
        400,
        error.flatten().fieldErrors,
      );
    }

    return errorResponse("Internal server error.", 500);
  }
}
