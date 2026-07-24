import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { productsQuerySchema } from "@/lib/validations/products";
import { getProducts } from "@/services/product.service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const input = productsQuerySchema.parse(query);

    const result = await getProducts(input);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query parameters.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
