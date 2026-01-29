export default function Step2Education({ data, setData }) {
  const education = data.education || [];

  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...education,
        {
          level: "",
          institute: "",
          degree: "",
          board: "",
          from: "",
          to: "",
          score: "",
        },
      ],
    });
  };

  const updateField = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;

    setData({
      ...data,
      education: updated,
    });
  };

  const removeEducation = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setData({
      ...data,
      education: updated,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Educational Details</h2>

      {education.map((edu, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">
              Education #{index + 1}
            </h3>

            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="border p-2"
              value={edu.level}
              onChange={(e) =>
                updateField(index, "level", e.target.value)
              }
            >
              <option value="">Select Level</option>
              <option value="School">School</option>
              <option value="College">College</option>
            </select>

            <input
              className="border p-2"
              placeholder="Institute Name"
              value={edu.institute}
              onChange={(e) =>
                updateField(index, "institute", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Degree / Class"
              value={edu.degree}
              onChange={(e) =>
                updateField(index, "degree", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Board / University"
              value={edu.board}
              onChange={(e) =>
                updateField(index, "board", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="From Year"
              value={edu.from}
              onChange={(e) =>
                updateField(index, "from", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="To Year"
              value={edu.to}
              onChange={(e) =>
                updateField(index, "to", e.target.value)
              }
            />

            <input
              className="border p-2 col-span-2"
              placeholder="Score / CGPA"
              value={edu.score}
              onChange={(e) =>
                updateField(index, "score", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Education
      </button>
    </div>
  );
}
