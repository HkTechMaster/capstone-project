import connectDB from "@/lib/mongodb";
import Student from "../../../models/Student";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      rollNo,
      course,
      department,
      officialEmail,
      photo,
    } = body;

    if (!name || !rollNo || !course || !department || !officialEmail) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const student = await Student.create({
      name,
      rollNo,
      course,
      department,
      officialEmail,
      photo,
      status: "REGISTERED",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. Waiting for approval.",
        studentId: student._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
