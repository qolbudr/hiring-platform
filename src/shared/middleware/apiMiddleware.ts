import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function handleApiMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized", error: "You should login to access this page" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET_KEY!));
    return NextResponse.next();
  } catch {
    return new NextResponse(JSON.stringify({ message: "Unauthorized", error: "Make sure your token is valid" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
