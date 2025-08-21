import { useState } from "react";

export default function JobForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jdUrl, setJdUrl] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;
    onSubmit({
      title: title.trim(),
      company: company.trim(),
      status,
      jd_url: jdUrl.trim() || null,
    });
    setTitle("");
    setCompany("");
    setStatus("Applied");
    setJdUrl("");
  }

  return (
    <form onSubmit={submit} className="form">
      <label>Job Title</label>
      <input
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Frontend Developer"
        required
      />
      <label>Company</label>
      <input
        className="input"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Standard Bank"
        required
      />
      <label>Status</label>
      <select
        className="select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
      </select>
      <label>Job URL (optional)</label>
      <input
        className="input"
        type="url"
        value={jdUrl}
        onChange={(e) => setJdUrl(e.target.value)}
        placeholder="https://jobs..."
      />
      <button className="btn" type="submit">
        Add Job
      </button>
    </form>
  );
}
