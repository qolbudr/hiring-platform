import { NextResponse } from "next/server";
import { db } from "@/shared/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const applicationData = await req.json();
    const newApplicationRef = await addDoc(collection(db, "application"), applicationData);
    return NextResponse.json({ message: "Application created successfully", data: { id: newApplicationRef.id, ...applicationData } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create application", error: (error as Error).message }, { status: 500 });
  }
}