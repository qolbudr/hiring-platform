import { NextRequest } from "next/server";
import { handleApiMiddleware } from "./shared/middleware/apiMiddleware";
import { handleWebMiddleware } from "./shared/middleware/webMiddleware";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    return handleApiMiddleware(req);
  }

  return handleWebMiddleware(req);
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/dashboard/:path*",
    "/api/:path((?!auth).*)"
  ],
};