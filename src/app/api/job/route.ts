import { NextResponse } from "next/server";
import { auth, db } from "@/shared/lib/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { User } from "@/module/auth/types/user";
import { Job } from "@/module/job/types/job";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const jobCollection = await getDocs(query(collection(db, "jobs")));
    const jobs: Job[] = jobCollection.docs.map(doc => Job.parse({ id: doc.id, ...doc.data() })).filter(job => job.title.toLowerCase().includes(search.toLowerCase()));
    return NextResponse.json({ message: "Jobs fetched successfully", data: jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch jobs", error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const jobData = await req.json();
    const newJobRef = await addDoc(collection(db, "jobs"), jobData);
    return NextResponse.json({ message: "Job created successfully", data: { id: newJobRef.id, ...jobData } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create job", error: (error as Error).message }, { status: 500 });
  }
}