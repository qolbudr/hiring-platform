import { NextResponse } from "next/server";
import { auth, db } from "@/shared/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { User } from "@/module/auth/types/user";

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: user.email,
            role: role,
            createdAt: new Date(),
        });

        const result: User = { id: user.uid, name, email: user.email!, role: role as 'admin' | 'user', createdAt: new Date() };
        return NextResponse.json({ message: "Registration successful", data: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Registration failed", error: (error as Error).message }, { status: 500 });
    }
}