import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { verifyAuthSchema } from "@/lib/validations/auth";
import { AuthenticationError, verifyCredentials } from "@/services/auth.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = verifyAuthSchema.parse(body);
    const result = await verifyCredentials(input);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 401 },
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
