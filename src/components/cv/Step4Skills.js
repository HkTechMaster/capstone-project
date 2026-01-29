export default function Step3Experience({ data, setData }) {
  const experience = data.experience || [];

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...experience,
        {
          type: "",
          organisation: "",
          role: "",
          from: "",
          to: "",
          skills: "",
          description: "",
        },
      ],
    });
  };

  const updateField = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;

    setData({
      ...data,
      experience: updated,
    });
  };

  const removeExperience = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    setData({
      ...data,
      experience: updated,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Experience Details</h2>

      {experience.map((exp, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">
              Experience #{index + 1}
            </h3>

            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="border p-2"
              value={exp.type}
              onChange={(e) =>
                updateField(index, "type", e.target.value)
              }
            >
              <option value="">Select Type</option>
              <option value="Internship">Internship</option>
              <option value="Job">Job</option>
              <option value="Training">Training</option>
            </select>

            <input
              className="border p-2"
              placeholder="Organisation / Company"
              value={exp.organisation}
              onChange={(e) =>
                updateField(index, "organisation", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Role / Position"
              value={exp.role}
              onChange={(e) =>
                updateField(index, "role", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="From (Month / Year)"
              value={exp.from}
              onChange={(e) =>
                updateField(index, "from", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="To (Month / Year)"
              value={exp.to}
              onChange={(e) =>
                updateField(index, "to", e.target.value)
              }
            />

            <input
              className="border p-2 col-span-2"
              placeholder="Skills Used (e.g. React, Node, SQL)"
              value={exp.skills}
              onChange={(e) =>
                updateField(index, "skills", e.target.value)
              }
            />

            <textarea
              className="border p-2 col-span-2"
              rows={3}
              placeholder="Experience Description"
              value={exp.description}
              onChange={(e) =>
                updateField(index, "description", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Experience
      </button>
    </div>
  );
}
