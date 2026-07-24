import { NextResponse } from "next/server";

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

function isApiResponse(value: unknown): value is { success: true; message: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    "message" in value
  );
}

export function successResponse<T>(
  data: T,
  message: string,
  status = 200,
  pagination?: Pagination,
) {
  if (isApiResponse(data)) {
    return NextResponse.json(data, { status });
  }

  const body: Record<string, unknown> = {
    success: true,
    message,
    data,
  };

  if (pagination) {
    body.pagination = pagination;
  }

  return NextResponse.json(body, { status });
}

export function errorResponse(
  message: string,
  status = 400,
  errors?: unknown,
) {
  const body: Record<string, unknown> = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    body.errors = errors;
  }

  return NextResponse.json(body, { status });
}
