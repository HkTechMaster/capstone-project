"use client";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Login successful");
    } else {
      alert(data.message);
    }
  };

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
      </div>
    </div>
  );
}
