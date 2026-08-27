import { supabase } from "./supabase.js";

export async function listJobs({ status } = {}) {
  let query = supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "All") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

export async function createJob(payload) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("You must be signed in to add an application.");
  }

  const newJob = {
    user_id: user.id,
    title: payload.title,
    company: payload.company,
    status: payload.status || "Applied",
    interview_at: payload.interview_at || null,
    jd_url: payload.jd_url || null,
    notes: payload.notes || null,
  };

  const { data, error } = await supabase
    .from("jobs")
    .insert(newJob)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateJob(id, updates) {
  const updatedJob = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("jobs")
    .update(updatedJob)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteJob(id) {
  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}