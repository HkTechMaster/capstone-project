import { NextResponse } from "next/server";
import CV from "@/models/CV";
import connectDB from "@/lib/db";

export async function POST(req) {
  await connectDB();
  const { cvId } = await req.json();

  await CV.findByIdAndUpdate(cvId, {
    status: "VERIFIED",
    remark: "",
  });

  return NextResponse.json({ success: true });
}
