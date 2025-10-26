import { createClient } from "@supabase/supabase-js";

// Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Generate or retrieve a persistent visitor ID
export function getVisitorId() {
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
}

// Fetch total likes for a profile
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

// Check if this visitor has already liked
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

// Toggle like for this visitor (only once)
export async function toggleLike(profileId = 1, visitorId) {
  if (!visitorId) return 0;

  try {
    // Upsert will insert if not exists, do nothing if already exists
    const { error } = await supabase
      .from("profile_likes_user")
      .upsert(
        { profile_id: profileId, visitor_id: visitorId, liked: true },
        { onConflict: ["profile_id", "visitor_id"] }
      );

    if (error) throw error;

    // Return updated total likes
    return await getLikes(profileId);
  } catch (err) {
    console.error("Error toggling like:", err.message);
    return await getLikes(profileId);
  }
}
