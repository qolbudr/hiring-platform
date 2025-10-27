import { NextResponse } from "next/server";
import { db } from "@/shared/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Application } from "@/module/applications/types/application";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    console.log(id);
    const applicationsRef = collection(db, "application");
    const q = query(applicationsRef, where("job_id", "==", id));

    const querySnapshot = await getDocs(q);
    const applications: Application[] = querySnapshot.docs.map(doc => Application.parse({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ message: "Applications fetched successfully", data: applications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch applications", error: (error as Error).message }, { status: 500 });
  }
}