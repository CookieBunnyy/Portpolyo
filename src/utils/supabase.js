import { createClient } from "@supabase/supabase-js";

// Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

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

// Check if the current user has liked
export async function hasLiked(profileId = 1, userId) {
  if (!userId) return false;
  const { data, error } = await supabase
    .from("profile_likes_user")
    .select("liked")
    .eq("profile_id", profileId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error checking like status:", error.message);
    return false;
  }

  return data?.liked || false;
}

// Increment like (or create if not exists)
export async function toggleLike(profileId = 1, userId) {
  if (!userId) return 0;

  try {
    // Check if user already liked
    const { data } = await supabase
      .from("profile_likes_user")
      .select("liked")
      .eq("profile_id", profileId)
      .eq("user_id", userId)
      .maybeSingle();

    if (data) {
      // If already liked, do nothing
      return await getLikes(profileId);
    } else {
      // Insert new like
      const { error } = await supabase
        .from("profile_likes_user")
        .insert([{ user_id: userId, profile_id: profileId, liked: true }]);

      if (error) throw error;
      return await getLikes(profileId);
    }
  } catch (err) {
    console.error("Error toggling like:", err.message);
    return await getLikes(profileId);
  }
}
