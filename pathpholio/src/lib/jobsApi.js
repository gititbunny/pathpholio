import { supabase } from "../supabase";

export async function listJobs({ status } = {}) {
  let q = supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });
  if (status && status !== "All") q = q.eq("status", status);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function createJob(payload) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const insert = {
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
    .insert(insert)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateJob(id, patch) {
  patch.updated_at = new Date().toISOString();
  const { data, error } = await supabase
    .from("jobs")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteJob(id) {
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) throw error;
  return true;
}
