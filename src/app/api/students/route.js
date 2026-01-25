import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name || !body.email || !body.password || !body.rollNo || !body.courses) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const student = await Student.create({
      name: body.name,
      email: body.email,
      password: body.password,
      rollNo: body.rollNo,
      department: body.department,
      courses: body.courses,
    });

    return NextResponse.json(
      { success: true, student },
      { status: 201 }
    );
  } catch (error) {
    console.error("STUDENT API ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
