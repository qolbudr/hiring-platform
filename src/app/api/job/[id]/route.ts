import { NextResponse } from "next/server";
import { db } from "@/shared/lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { Job } from "@/module/job/types/job";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const jobDoc = await getDoc(doc(db, "jobs", id));
    if (!jobDoc.exists()) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    const job: Job = Job.parse({ id: jobDoc.id, ...jobDoc.data() });
    return NextResponse.json({ message: "Job fetched successfully", data: job }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch job", error: (error as Error).message }, { status: 500 });
  }
}