import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Header from "../components/Header.jsx";
import JobForm from "../components/JobForm.jsx";
import Filters from "../components/Filters.jsx";
import JobTable from "../components/JobTable.jsx";

import {
  listJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/jobsApi.js";

import "../styles/dashboard.css";

export default function Dashboard() {
  const { session, authLoading, addToast } = useOutletContext();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadJobs = useCallback(async () => {
    setLoading(true);

    try {
      const data = await listJobs();
      setJobs(data);
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!session) {
      navigate("/auth");
      return;
    }

    loadJobs();
  }, [session, authLoading, navigate, loadJobs]);

  async function handleCreate(form) {
    try {
      const newJob = await createJob(form);

      setJobs((currentJobs) => [newJob, ...currentJobs]);

      addToast("Application added");
    } catch (error) {
      addToast(error.message, "error");
    }
  }

  async function handleUpdate(id, updates) {
    try {
      const updatedJob = await updateJob(id, updates);

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === id ? updatedJob : job
        )
      );

      addToast("Application updated");
    } catch (error) {
      addToast(error.message, "error");
    }
  }

  async function handleDelete(id) {
    const previousJobs = jobs;

    setJobs((currentJobs) =>
      currentJobs.filter((job) => job.id !== id)
    );

    try {
      await deleteJob(id);
      addToast("Application deleted");
    } catch (error) {
      setJobs(previousJobs);
      addToast(error.message, "error");
    }
  }

  const filteredJobs =
    statusFilter === "All"
      ? jobs
      : jobs.filter((job) => job.status === statusFilter);

  const interviewCount = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerCount = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  if (authLoading) {
    return (
      <div className="dashboard-loading">
        Checking your session...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <Header session={session} />

      <main className="dashboard-main">
        <section className="dashboard-intro">
          <div>
            <p className="dashboard-eyebrow">
              YOUR JOB SEARCH
            </p>

            <h1>Your applications.</h1>

            <p className="dashboard-intro-text">
              Add opportunities, update their progress and keep
              everything organised in one place.
            </p>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="dashboard-stat">
            <span>Total applications</span>
            <strong>{jobs.length}</strong>
          </div>

          <div className="dashboard-stat">
            <span>Interviews</span>
            <strong>{interviewCount}</strong>
          </div>

          <div className="dashboard-stat">
            <span>Offers</span>
            <strong>{offerCount}</strong>
          </div>
        </section>

        <section className="dashboard-panel dashboard-add-panel">
          <div className="dashboard-panel-heading">
            <div>
              <p className="dashboard-eyebrow">
                NEW APPLICATION
              </p>

              <h2>Add an opportunity</h2>
            </div>
          </div>

          <JobForm onSubmit={handleCreate} />
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel-heading dashboard-applications-heading">
            <div>
              <p className="dashboard-eyebrow">
                APPLICATIONS
              </p>

              <h2>Your job search</h2>
            </div>

            <Filters
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>

          {loading ? (
            <div className="dashboard-loading">
              Loading your applications...
            </div>
          ) : (
            <JobTable
              jobs={filteredJobs}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}