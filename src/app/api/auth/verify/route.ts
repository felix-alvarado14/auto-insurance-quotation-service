import { ZodError } from "zod";

import { verifyAuthSchema } from "@/lib/validations/auth";
import { AuthenticationError, verifyCredentials } from "@/services/auth.service";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = verifyAuthSchema.parse(body);
    const result = await verifyCredentials(input);

    return successResponse(result, result.message, 200);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        "Invalid request body.",
        400,
        error.flatten().fieldErrors,
      );
    }

    if (error instanceof AuthenticationError) {
      return errorResponse(error.message, 401);
    }

    return errorResponse("Internal server error.", 500);
  }
}
