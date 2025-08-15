import { useState } from "react";

function StatusChip({ status }) {
  const cls =
    status === "Applied"
      ? "applied"
      : status === "Interview"
      ? "interview"
      : "offer";
  return <span className={`chip ${cls}`}>{status}</span>;
}

export default function JobTable({ jobs, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({
    title: "",
    company: "",
    status: "Applied",
  });

  function startEdit(job) {
    setEditingId(job.id);
    setDraft({ title: job.title, company: job.company, status: job.status });
  }
  function cancel() {
    setEditingId(null);
  }
  function save() {
    onUpdate(editingId, { ...draft });
    setEditingId(null);
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Links</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>
                {editingId === job.id ? (
                  <input
                    className="input"
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                  />
                ) : (
                  job.title
                )}
              </td>
              <td>
                {editingId === job.id ? (
                  <input
                    className="input"
                    value={draft.company}
                    onChange={(e) =>
                      setDraft({ ...draft, company: e.target.value })
                    }
                  />
                ) : (
                  job.company
                )}
              </td>
              <td>
                {editingId === job.id ? (
                  <select
                    className="select"
                    value={draft.status}
                    onChange={(e) =>
                      setDraft({ ...draft, status: e.target.value })
                    }
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                  </select>
                ) : (
                  <StatusChip status={job.status} />
                )}
              </td>
              <td>
                {job.jd_url ? (
                  <a href={job.jd_url} target="_blank">
                    Job post
                  </a>
                ) : (
                  <span style={{ opacity: 0.6 }}>—</span>
                )}
              </td>
              <td>
                {editingId === job.id ? (
                  <>
                    <button className="btn" onClick={save}>
                      Save
                    </button>{" "}
                    <button className="btn" onClick={cancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn" onClick={() => startEdit(job)}>
                      Edit
                    </button>{" "}
                    <button
                      className="btn"
                      style={{ background: "var(--danger)" }}
                      onClick={() => onDelete(job.id)}
                    >
                      Remove
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="5" style={{ opacity: 0.8, padding: "20px" }}>
                No applications yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
