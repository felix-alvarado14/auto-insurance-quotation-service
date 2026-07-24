import { NextResponse } from "next/server";

import { openApiDocument } from "@/lib/openapi/document";

export async function GET() {
  return NextResponse.json(openApiDocument, {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}
