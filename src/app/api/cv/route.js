import connectDB from "@/lib/mongodb";
import StudentCV from "../../../models/StudentCV";
import Student from "../../../models/Student";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { studentId, cv } = body;

    // ensure student exists
    const student = await Student.findById(studentId);
    if (!student || student.status !== "IDENTITY_APPROVED") {
      return NextResponse.json(
        { success: false, message: "Not allowed" },
        { status: 403 }
      );
    }

    const existing = await StudentCV.findOne({ studentId });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "CV already created" },
        { status: 400 }
      );
    }

    await StudentCV.create({
      studentId,
      ...cv,
      status: "SUBMITTED",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
