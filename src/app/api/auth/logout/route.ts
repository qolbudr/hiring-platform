import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        res.cookies.delete("token");
        return res;
    } catch (error) {
        return NextResponse.json({ message: "Logout failed", error: (error as Error).message }, { status: 500 });
    }
}