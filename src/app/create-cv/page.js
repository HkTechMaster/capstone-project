"use client";
import { useState } from "react";
import Stepper from "@/components/cv/Stepper";
import Step1Personal from "@/components/cv/Step1Personal";
import Step2Education from "@/components/cv/Step2Education";
import Step3Experience from "@/components/cv/Step3Experience";
import Step4Skills from "@/components/cv/Step4Skills";
import Step5Projects from "@/components/cv/Step5Projects";
import Step6Certificates from "@/components/cv/Step6Certificates";
import Step7Preview from "@/components/cv/Step7Preview";

export default function CreateCVPage() {
    const [step, setStep] = useState(1);

    const [cvData, setCvData] = useState({
        personal: {},
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certificates: [],
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, 7));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));
    const submitCV = async () => {
        try {
            const student = JSON.parse(localStorage.getItem("student"));

            const res = await fetch("/api/cv/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentId: student._id,
                    cvData,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert("CV submitted successfully. Waiting for verification.");
                router.push("/status");
            } else {
                alert(data.message || "CV submission failed");
            }
        } catch (err) {
            alert("Server error");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Stepper currentStep={step} />

            <div className="bg-white rounded shadow p-6 mt-4">
                {step === 1 && <Step1Personal data={cvData} setData={setCvData} />}
                {step === 2 && <Step2Education data={cvData} setData={setCvData} />}
                {step === 3 && <Step3Experience data={cvData} setData={setCvData} />}
                {step === 4 && <Step4Skills data={cvData} setData={setCvData} />}
                {step === 5 && <Step5Projects data={cvData} setData={setCvData} />}
                {step === 6 && <Step6Certificates data={cvData} setData={setCvData} />}
                {step === 7 && <Step7Preview data={cvData} onSubmit={submitCV} />}
            </div>

            <div className="flex justify-between mt-6">
                {step > 1 && (
                    <button
                        onClick={prevStep}
                        className="border px-4 py-2 rounded"
                    >
                        Prev Step
                    </button>
                )}

                {step < 7 && (
                    <button
                        onClick={nextStep}
                        className="bg-white-600 text-black px-4 py-2 border rounded"
                    >
                        Next Step
                    </button>
                )}
            </div>
        </div>
    );
}
