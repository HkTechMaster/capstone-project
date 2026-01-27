"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StatusPage() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("studentEmail");

    if (!email) {
      router.push("/");
      return;
    }

    const fetchStatus = async () => {
      const res = await fetch(
        `/api/students/status?email=${email}`
      );
      const data = await res.json();

      if (data.success) {
        setStatus(data.status);
        setRemark(data.remark || "");
      }
    };

    fetchStatus();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96 text-center">
        <h2 className="text-xl font-bold mb-4">
          Application Status
        </h2>

        {status === "REGISTERED" && (
          <p className="text-yellow-600">
            ⏳ Waiting for coordinator approval
          </p>
        )}

        {status === "IDENTITY_APPROVED" && (
          <>
            <p className="text-green-600 mb-4">
              ✅ Identity approved
            </p>
            <button
              onClick={() => router.push("/create-cv")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create CV
            </button>
          </>
        )}

        {remark && status === "REGISTERED" && (
          <p className="text-red-600 mt-4">
            ❌ Rejected: {remark}
          </p>
        )}

        {status === "ACTIVE" && (
          <button
            onClick={() => router.push("/login")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
