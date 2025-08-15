import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm.jsx";
import Filters from "../components/Filters.jsx";
import JobTable from "../components/JobTable.jsx";
import { listJobs, createJob, updateJob, deleteJob } from "../lib/jobsApi.js";

export default function Dashboard() {
  const { session, addToast } = useOutletContext();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate("/auth");
      return;
    }
    load();
    // eslint-disable-next-line
  }, [session, statusFilter]);

  async function load() {
    setLoading(true);
    try {
      const data = await listJobs({ status: statusFilter });
      setJobs(data);
    } catch (e) {
      addToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function onCreate(form) {
    try {
      const rec = await createJob(form);
      setJobs((j) => [rec, ...j]);
      addToast("Job added");
    } catch (e) {
      addToast(e.message, "error");
    }
  }

  async function onUpdate(id, patch) {
    try {
      const rec = await updateJob(id, patch);
      setJobs((j) => j.map((x) => (x.id === id ? rec : x)));
      addToast("Updated");
    } catch (e) {
      addToast(e.message, "error");
    }
  }

  async function onDelete(id) {
    const prev = jobs;
    setJobs((j) => j.filter((x) => x.id !== id)); // optimistic
    try {
      await deleteJob(id);
      addToast("Deleted");
    } catch (e) {
      setJobs(prev);
      addToast(e.message, "error");
    }
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ marginTop: 0 }}>Add Job Application</h2>
        <JobForm onSubmit={onCreate} />
      </div>

      <div className="card" style={{ marginBottom: "16px" }}>
        <Filters value={statusFilter} onChange={setStatusFilter} />
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Your Applications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <JobTable jobs={jobs} onUpdate={onUpdate} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
}
