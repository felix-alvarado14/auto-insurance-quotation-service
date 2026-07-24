import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyToken } from "@/lib/jwt";

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized.",
    },
    { status: 401 },
  );
}

export async function middleware(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader) {
    return unauthorizedResponse();
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return unauthorizedResponse();
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/products/:path*", "/api/quotations/:path*"],
};

export const runtime = "nodejs";
