import connectDB from "@/lib/mongodb";
import Student from "../../../../models/Student";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const students = await Student.find({
      status: "REGISTERED",
    });

    return NextResponse.json({
      success: true,
      students,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
