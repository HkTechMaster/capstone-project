export default function Step5Projects({ data, setData }) {
  const projects = data.projects || [];

  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...projects,
        {
          title: "",
          tech: "",
          duration: "",
          description: "",
          link: "",
        },
      ],
    });
  };

  const updateField = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;

    setData({
      ...data,
      projects: updated,
    });
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setData({
      ...data,
      projects: updated,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      {projects.map((project, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">
              Project #{index + 1}
            </h3>

            <button
              onClick={() => removeProject(index)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                updateField(index, "title", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Technology Stack (e.g. React, Node)"
              value={project.tech}
              onChange={(e) =>
                updateField(index, "tech", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Duration (e.g. Jan 2024 – Mar 2024)"
              value={project.duration}
              onChange={(e) =>
                updateField(index, "duration", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Project URL (optional)"
              value={project.link}
              onChange={(e) =>
                updateField(index, "link", e.target.value)
              }
            />

            <textarea
              className="border p-2 col-span-2"
              rows={3}
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                updateField(index, "description", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Project
      </button>
    </div>
  );
}
