import { NextResponse } from "next/server";

// TODO: Middleware-specific behavior will be implemented in a future phase.
export function middleware() {
  return NextResponse.next();
}
