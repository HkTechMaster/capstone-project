import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const student = await Student.findOne({ email });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    if (student.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNo: student.rollNo,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
