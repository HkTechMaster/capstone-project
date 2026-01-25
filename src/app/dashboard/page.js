"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("student");

    if (!data) {
      // ❌ not logged in
      router.push("/login");
    } else {
      setStudent(JSON.parse(data));
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("student");
    router.push("/login");
  };

  if (!student) return null;

  return (
  <div className="min-h-screen bg-gray-100">
    {/* Top Bar */}
    <div className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">Student Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    {/* Content */}
    <div className="max-w-xl mx-auto bg-white p-6 mt-6 rounded shadow">
      <p><b>Name:</b> {student.name}</p>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Roll No:</b> {student.rollNo}</p>
    </div>
  </div>
);

}
