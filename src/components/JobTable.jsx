import { useState } from "react";

export default function JobTable({ jobs, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  function startEditing(job) {
    setEditingId(job.id);

    setEditForm({
      title: job.title || "",
      company: job.company || "",
      status: job.status || "Applied",
      jd_url: job.jd_url || "",
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditForm({});
  }

  async function saveEdit(id) {
    if (!editForm.title.trim() || !editForm.company.trim()) {
      return;
    }

    setSaving(true);

    try {
      await onUpdate(id, {
        title: editForm.title.trim(),
        company: editForm.company.trim(),
        status: editForm.status,
        jd_url: editForm.jd_url.trim() || null,
      });

      cancelEditing();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(job) {
    const confirmed = window.confirm(
      `Remove "${job.title}" from your applications?`
    );

    if (!confirmed) {
      return;
    }

    await onDelete(job.id);
  }

  if (jobs.length === 0) {
    return (
      <div className="job-empty-state">
        <h3>No applications here yet.</h3>
        <p>
          Add an application above or choose another status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => {
        const isEditing = editingId === job.id;

        return (
          <article className="job-card" key={job.id}>
            {isEditing ? (
              <div className="job-edit-form">
                <div className="job-edit-grid">
                  <div className="job-field">
                    <label htmlFor={`edit-title-${job.id}`}>
                      Job title
                    </label>

                    <input
                      id={`edit-title-${job.id}`}
                      type="text"
                      value={editForm.title}
                      onChange={(event) =>
                        setEditForm((current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="job-field">
                    <label htmlFor={`edit-company-${job.id}`}>
                      Company
                    </label>

                    <input
                      id={`edit-company-${job.id}`}
                      type="text"
                      value={editForm.company}
                      onChange={(event) =>
                        setEditForm((current) => ({
                          ...current,
                          company: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="job-field">
                    <label htmlFor={`edit-status-${job.id}`}>
                      Status
                    </label>

                    <select
                      id={`edit-status-${job.id}`}
                      value={editForm.status}
                      onChange={(event) =>
                        setEditForm((current) => ({
                          ...current,
                          status: event.target.value,
                        }))
                      }
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                    </select>
                  </div>

                  <div className="job-field">
                    <label htmlFor={`edit-url-${job.id}`}>
                      Job posting link
                    </label>

                    <input
                      id={`edit-url-${job.id}`}
                      type="url"
                      value={editForm.jd_url}
                      onChange={(event) =>
                        setEditForm((current) => ({
                          ...current,
                          jd_url: event.target.value,
                        }))
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="job-edit-actions">
                  <button
                    type="button"
                    className="job-save-button"
                    onClick={() => saveEdit(job.id)}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    className="job-cancel-button"
                    onClick={cancelEditing}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="job-card-main">
                  <div className="job-card-copy">
                    <span
                      className={`job-status job-status-${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>

                    <h3>{job.title}</h3>

                    <p>{job.company}</p>
                  </div>

                  <div className="job-card-actions">
                    {job.jd_url && (
                      <a
                        href={job.jd_url}
                        target="_blank"
                        rel="noreferrer"
                        className="job-link-button"
                      >
                        View Job
                      </a>
                    )}

                    <button
                      type="button"
                      className="job-edit-button"
                      onClick={() => startEditing(job)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="job-delete-button"
                      onClick={() => handleDelete(job)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}