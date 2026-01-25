"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rollNo: "",
    department: "",
    courses: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const submitForm = async () => {
  try {
    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const text = await res.text();        // 👈 SAFE READ
    const data = text ? JSON.parse(text) : {};

    if (res.ok && data.success) {
      alert("Student Registered Successfully");
      router.push("/login");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Add Student</h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          name="rollNo"
          placeholder="Roll No"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          name="department"
          placeholder="Department"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />
        <input
          name="courses"
          placeholder="Courses"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button
          onClick={submitForm}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Save Student
        </button>
      </div>
    </div>
  );
}
