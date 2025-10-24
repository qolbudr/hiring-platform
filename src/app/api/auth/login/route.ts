import { NextResponse } from "next/server";
import { auth, db } from "@/shared/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { User } from "@/module/auth/types/user";
import { signJWTToken } from "@/shared/lib/jwt";


export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        const result: User = { id: user.uid, name: userData?.name, email: user.email!, role: userData?.role, createdAt: userData?.createdAt.toDate() };
        const token = signJWTToken(result);
        result.token = token;
        const res = NextResponse.json({ message: "Login successful", data: result }, { status: 200 });
        res.cookies.set("token", token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7 });
        return res;
    } catch (error) {
        return NextResponse.json({ message: "Login failed", error: (error as Error).message }, { status: 500 });
    }
}