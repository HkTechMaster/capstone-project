import connectDB from "@/lib/mongodb";
import Student from "../../../../models/Student";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { studentId, action, remark } = await req.json();

    if (!studentId || !action) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      await Student.findByIdAndUpdate(studentId, {
        status: "IDENTITY_APPROVED",
        rejectionRemark: "",
      });
    }

    if (action === "reject") {
      await Student.findByIdAndUpdate(studentId, {
        status: "REGISTERED",
        rejectionRemark: remark || "Rejected by coordinator",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
