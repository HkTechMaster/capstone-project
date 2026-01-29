import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CV from "@/models/CV";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email missing" },
        { status: 400 }
      );
    }

    const cv = await CV.findOne({ email });

    if (!cv) {
      return NextResponse.json(
        { success: false, message: "CV not found" },
        { status: 404 }
      );
    }

    cv.status = "SUBMITTED";
    cv.remark = "";
    await cv.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CV SUBMIT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
