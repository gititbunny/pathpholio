import { useState } from "react";

export default function JobForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobUrl, setJobUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !company.trim()) {
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        company: company.trim(),
        status,
        jd_url: jobUrl.trim() || null,
      });

      setTitle("");
      setCompany("");
      setStatus("Applied");
      setJobUrl("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <div className="job-form-grid">
        <div className="job-field">
          <label htmlFor="job-title">Job title</label>

          <input
            id="job-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Junior Software Developer"
            required
          />
        </div>

        <div className="job-field">
          <label htmlFor="job-company">Company</label>

          <input
            id="job-company"
            type="text"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company name"
            required
          />
        </div>

        <div className="job-field">
          <label htmlFor="job-status">Status</label>

          <select
            id="job-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        <div className="job-field">
          <label htmlFor="job-url">Job posting link</label>

          <input
            id="job-url"
            type="url"
            value={jobUrl}
            onChange={(event) => setJobUrl(event.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <button
        className="job-submit"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Application"}
      </button>
    </form>
  );
}