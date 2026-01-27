"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const student = localStorage.getItem("student");

    if (student) {
      // 👇 Already logged in → dashboard
      router.push("/dashboard");
    }
  }, [router]);

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    course: "",
    department: "",
    officialEmail: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePhoto = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        photo: reader.result, // base64
      }));
    };

    reader.readAsDataURL(file);
  };


  const submitForm = async () => {
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem(
          "studentEmail",
          form.officialEmail
        );

        router.push("/status");
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
          placeholder="Full Name"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="officialEmail"
          placeholder="Official University Email"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="rollNo"
          placeholder="Roll Number"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="course"
          placeholder="Course / Program"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <label className="block mb-1 font-medium">Upload Photo</label>

        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full mb-4"
          onChange={(e) => handlePhoto(e.target.files[0])}
        />



        <button
          onClick={submitForm}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Save Student
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
