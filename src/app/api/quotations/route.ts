import { ZodError } from "zod";

import { quotationCreateSchema } from "@/lib/validations/quotations";
import { createQuotation, QuotationServiceError } from "@/services/quotation.service";
import { verifyToken } from "@/lib/jwt";
import type { JwtPayload } from "@/types/jwt";
import { errorResponse, successResponse } from "@/lib/api-response";

function extractBearerToken(request: Request): string | null {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

function getAuthenticatedUserId(payload: JwtPayload): number | null {
  const userId = Number(payload.sub);

  if (!Number.isInteger(userId) || userId <= 0) {
    return null;
  }

  return userId;
}

function unauthorizedResponse() {
  return errorResponse("Unauthorized.", 401);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = quotationCreateSchema.parse(body);

    const token = extractBearerToken(request);

    if (!token) {
      return unauthorizedResponse();
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return unauthorizedResponse();
    }

    const userId = getAuthenticatedUserId(payload);

    if (!userId) {
      return unauthorizedResponse();
    }

    const result = await createQuotation({
      ...input,
      userId,
    });

    return successResponse(result, result.message, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        "Invalid request body.",
        400,
        error.flatten().fieldErrors,
      );
    }

    if (error instanceof QuotationServiceError) {
      return errorResponse(error.message, error.status);
    }

    if (error instanceof SyntaxError) {
      return errorResponse("Invalid JSON body.", 400);
    }

    return errorResponse("Internal server error.", 500);
  }
}
