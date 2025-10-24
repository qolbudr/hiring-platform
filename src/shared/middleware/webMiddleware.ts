import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function handleWebMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/auth/login"];

  if (!token && pathname.startsWith("/dashboard") || pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(SECRET_KEY!));

      if (publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/auth/login", req.url));
      res.cookies.delete("token");
      return res;
    }
  }

  return NextResponse.next();
}
