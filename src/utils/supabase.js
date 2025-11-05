import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl, supabaseKey);


export function getVisitorId() {
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
}




export async function getLikes(profileId = 1) {
  try {
    const { data, error } = await supabase
      .from("profile_likes_user")
      .select("id", { count: "exact" })
      .eq("profile_id", profileId)
      .eq("liked", true);

    if (error) throw error;
    return data?.length || 0;
  } catch (err) {
    console.error("Error fetching likes:", err.message);
    return 0;
  }
}


export async function hasLiked(profileId = 1, visitorId) {
  if (!visitorId) return false;

  try {
    const { data, error } = await supabase
      .from("profile_likes_user")
      .select("liked")
      .eq("profile_id", profileId)
      .eq("visitor_id", visitorId)
      .maybeSingle();

    if (error) throw error;
    return data?.liked || false;
  } catch (err) {
    console.error("Error checking like status:", err.message);
    return false;
  }
}


export async function toggleLike(profileId = 1, visitorId) {
  if (!visitorId) return 0;

  try {
    const { error } = await supabase
      .from("profile_likes_user")
      .upsert(
        { profile_id: profileId, visitor_id: visitorId, liked: true },
        { onConflict: ["profile_id", "visitor_id"] }
      );

    if (error) throw error;
    return await getLikes(profileId);
  } catch (err) {
    console.error("Error toggling like:", err.message);
    return await getLikes(profileId);
  }
}



export async function getProjectsCount() {
  try {
    const { count, error } = await supabase
      .from("project_stats") 
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count || 0;
  } catch (err) {
    console.error("Error fetching project count:", err.message);
    return 0;
  }
}


export async function getCVDownloads() {
  const { data, error } = await supabase
    .from("cv_downloads")
    .select("count")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching downloads:", error);
    return 0;
  }

  return data?.count ?? 0;
}

export async function incrementCVDownloads() {
  const { error } = await supabase.rpc("increment_cv_downloads");
  if (error) {
    console.error("Error incrementing CV downloads:", error);
    return;
  }
}
