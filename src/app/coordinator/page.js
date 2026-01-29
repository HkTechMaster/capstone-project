"use client";
import { useEffect, useState } from "react";

export default function CoordinatorPage() {
    const [students, setStudents] = useState([]);
    const [remark, setRemark] = useState("");

    const fetchStudents = async () => {
        const res = await fetch("/api/coordinator/students");
        const data = await res.json();
        if (data.success) setStudents(data.students);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const takeAction = async (studentId, action) => {
        await fetch("/api/coordinator/action", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                studentId,
                action,
                remark,
            }),
        });

        setRemark("");
        fetchStudents();
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">
                Coordinator – Student Approvals
            </h1>

            {students.length === 0 && (
                <p>No students waiting for approval</p>
            )}

            {students.map((s) => (
                <div
                    key={s._id}
                    className="bg-white border rounded p-3 mb-3"
                >
                    {/* MAIN ROW */}
                    <div className="flex gap-4 items-start">

                        {/* PHOTO BOX (FIXED SIZE) */}
                        <div
                            className="w-[90px] h-[110px] border rounded overflow-hidden flex-shrink-0"
                        >
                            <img
                                src={s.photo}
                                alt="student"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* INFO + ACTIONS */}
                        <div className="flex-1 text-sm">

                            {/* STUDENT DETAILS */}
                            <p><b>Name:</b> {s.name}</p>
                            <p><b>Roll:</b> {s.rollNo}</p>
                            <p><b>Course:</b> {s.course}</p>
                            <p><b>Dept:</b> {s.department}</p>
                            <p className="text-gray-600">{s.officialEmail}</p>

                            {/* REMARK */}
                            <textarea
                                placeholder="Rejection remark (optional)"
                                className="border w-full p-1 mt-2 text-sm"
                                onChange={(e) => setRemark(e.target.value)}
                            />

                            {/* ACTION BUTTONS (SAME BLOCK) */}
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => takeAction(s._id, "approve")}
                                    className="bg-green-600 text-green px-3 py-1 rounded text-sm"
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() => takeAction(s._id, "reject")}
                                    className="bg-red-600 text-red px-3 py-1 rounded text-sm"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}
