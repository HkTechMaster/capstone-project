export default function Step6Certificates({ data, setData }) {
  const certificates = data.certificates || [];

  const addCertificate = () => {
    setData({
      ...data,
      certificates: [
        ...certificates,
        {
          title: "",
          issuer: "",
          date: "",
          link: "",
          description: "",
        },
      ],
    });
  };

  const updateField = (index, field, value) => {
    const updated = [...certificates];
    updated[index][field] = value;

    setData({
      ...data,
      certificates: updated,
    });
  };

  const removeCertificate = (index) => {
    const updated = certificates.filter((_, i) => i !== index);
    setData({
      ...data,
      certificates: updated,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Certificates / Achievements
      </h2>

      {certificates.map((cert, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">
              Certificate #{index + 1}
            </h3>

            <button
              onClick={() => removeCertificate(index)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2"
              placeholder="Certificate / Achievement Name"
              value={cert.title}
              onChange={(e) =>
                updateField(index, "title", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Issuing Organization"
              value={cert.issuer}
              onChange={(e) =>
                updateField(index, "issuer", e.target.value)
              }
            />

            <input
              type="month"
              className="border p-2"
              value={cert.date}
              onChange={(e) =>
                updateField(index, "date", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Certificate URL (optional)"
              value={cert.link}
              onChange={(e) =>
                updateField(index, "link", e.target.value)
              }
            />

            <textarea
              className="border p-2 col-span-2"
              rows={3}
              placeholder="Short description (optional)"
              value={cert.description}
              onChange={(e) =>
                updateField(index, "description", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <button
        onClick={addCertificate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Certificate / Achievement
      </button>
    </div>
  );
}
