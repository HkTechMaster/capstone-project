export default function Stepper({ currentStep }) {
  const steps = [
    "Personal",
    "Education",
    "Experience",
    "Skills",
    "Projects",
    "Certificates",
    "Preview",
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      {steps.map((label, i) => (
        <div
          key={label}
          className={`px-3 py-1 rounded-full text-sm ${
            currentStep === i + 1
              ? "bg-teal-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {i + 1}. {label}
        </div>
      ))}
    </div>
  );
}
