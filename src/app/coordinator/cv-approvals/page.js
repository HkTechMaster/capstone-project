"use client";
import { useEffect, useState } from "react";

export default function CoordinatorCVApprovals() {
  const [cvs, setCVs] = useState([]);

  useEffect(() => {
    fetch("/api/cv/list")
      .then(res => res.json())
      .then(data => {
        if (data.success) setCVs(data.cvs);
      });
  }, []);

  const approveCV = async (cvId) => {
    await fetch("/api/cv/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cvId }),
    });
    alert("CV Approved");
    location.reload();
  };

  const rejectCV = async (cvId, remark) => {
    await fetch("/api/cv/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cvId, remark }),
    });
    alert("CV Rejected");
    location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        CV Approvals
      </h1>

      {cvs.map((cv) => (
        <div
          key={cv._id}
          className="border p-4 mb-4 rounded"
        >
          <p><b>Name:</b> {cv.personal?.name}</p>
          <p><b>Email:</b> {cv.email}</p>

          <button
            className="bg-gray-600 text-white px-3 py-1 mr-2"
            onClick={() =>
              window.open(`/cv-preview/${cv._id}`, "_blank")
            }
          >
            View CV
          </button>

          <button
            className="bg-green-600 text-white px-3 py-1 mr-2"
            onClick={() => approveCV(cv._id)}
          >
            Approve
          </button>

          <button
            className="bg-red-600 text-white px-3 py-1"
            onClick={() => {
              const remark = prompt("Rejection reason?");
              if (remark) rejectCV(cv._id, remark);
            }}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
