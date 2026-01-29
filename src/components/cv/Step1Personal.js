export default function Step1Personal({ data, setData }) {
  const personal = data.personal || {};

  const updateField = (field, value) => {
    setData({
      ...data,
      personal: {
        ...personal,
        [field]: value,
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Personal Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2"
          placeholder="Full Name"
          value={personal.name || ""}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Location"
          value={personal.location || ""}
          onChange={(e) => updateField("location", e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Phone Number"
          value={personal.phone || ""}
          onChange={(e) => updateField("phone", e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="e-mail id"
          value={personal.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="LinkedIn URL"
          value={personal.linkedin || ""}
          onChange={(e) => updateField("linkedin", e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="GitHub URL"
          value={personal.github || ""}
          onChange={(e) => updateField("github", e.target.value)}
        />
      </div>

      <textarea
        className="border p-2 w-full mt-4"
        rows={4}
        placeholder="Profile Summary"
        value={personal.summary || ""}
        onChange={(e) => updateField("summary", e.target.value)}
      />

      <div className="mt-4">
        <label className="block font-medium mb-1">Upload Photo</label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
