import { NextResponse } from "next/server";
import CV from "@/models/CV";
import connectDB from "@/lib/db";

export async function POST(req) {
  await connectDB();
  const { cvId, remark } = await req.json();

  await CV.findByIdAndUpdate(cvId, {
    status: "REJECTED",
    remark,
  });

  return NextResponse.json({ success: true });
}
