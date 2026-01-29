export default function Step7Preview({ data, onSubmit }) {
  const {
    personal = {},
    education = [],
    experience = [],
    skills = [],
    projects = [],
    certificates = [],
  } = data;

  return (
    <div className="bg-white p-6 rounded">

      {/* ===== CV HEADER ===== */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">{personal.name}</h1>
        <p className="text-sm text-gray-600">
          {personal.location} | {personal.phone}
        </p>
        <p className="text-sm text-gray-600">
          {personal.linkedin && <>LinkedIn: {personal.linkedin} </>}
          {personal.github && <>| GitHub: {personal.github}</>}
        </p>
      </div>

      {/* ===== SUMMARY ===== */}
      {personal.summary && (
        <Section title="Profile Summary">
          <p className="text-sm">{personal.summary}</p>
        </Section>
      )}

      {/* ===== EDUCATION ===== */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">
                {edu.degree} – {edu.institute}
              </p>
              <p className="text-sm text-gray-600">
                {edu.board} | {edu.from} – {edu.to} | {edu.score}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* ===== EXPERIENCE ===== */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">
                {exp.role} – {exp.organisation}
              </p>
              <p className="text-sm text-gray-600">
                {exp.type} | {exp.from} – {exp.to}
              </p>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </Section>
      )}

      {/* ===== SKILLS ===== */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-200 px-2 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* ===== PROJECTS ===== */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{proj.title}</p>
              <p className="text-sm text-gray-600">
                {proj.tech} | {proj.duration}
              </p>
              <p className="text-sm">{proj.description}</p>
              {proj.link && (
                <p className="text-sm text-blue-600">{proj.link}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ===== CERTIFICATES ===== */}
      {certificates.length > 0 && (
        <Section title="Certificates & Achievements">
          {certificates.map((cert, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">
                {cert.title} – {cert.issuer}
              </p>
              <p className="text-sm text-gray-600">{cert.date}</p>
              {cert.description && (
                <p className="text-sm">{cert.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ===== SUBMIT BUTTON (👇 YAHI ADD KARNA THA) ===== */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={onSubmit}
          className="bg-green-600 text-black px-6 py-2 border rounded"
        >
          Submit CV for Verification
        </button>
      </div>
    </div>
  );
}

/* Reusable section */
function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold border-b mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}
