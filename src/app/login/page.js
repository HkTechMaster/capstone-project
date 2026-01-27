"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const student = localStorage.getItem("student");

    if (student) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // 👇 LOGIN STATE SAVE
        localStorage.setItem(
          "student",
          JSON.stringify(data.student)
        );

        alert("Login successful");
        router.push("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };
  return (
  <div className="h-screen flex items-center justify-center">
    <h2 className="text-xl font-bold text-red-600">
      Login disabled until profile approval & CV verification
    </h2>
  </div>
);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Student Login</h2>

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
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          New student?{" "}
          <span
            onClick={() => router.push("/")}
            className="text-blue-600 cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

