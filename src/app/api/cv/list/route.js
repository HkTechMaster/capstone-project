import { NextResponse } from "next/server";
import CV from "@/models/CV";
import connectDB from "@/lib/db";

export async function GET() {
  await connectDB();

  const cvs = await CV.find({ status: "SUBMITTED" });
  return NextResponse.json({ success: true, cvs });
}
