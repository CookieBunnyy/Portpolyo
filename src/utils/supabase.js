import { createClient } from "@supabase/supabase-js";

// Use environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch likes
export async function getLikes() {
  const { data, error } = await supabase
    .from("profile_likes")
    .select("likes")
    .eq("id", 1)       // assume row with id=1 exists
    .single();

  if (error) {
    console.error("Error fetching likes:", error);
    return 0;
  }
  return data.likes || 0;
}

// Increment likes
export async function incrementLikes() {
  const { data, error } = await supabase
    .from("profile_likes")
    .update({ likes: supabase.raw("likes + 1") })
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error("Error incrementing likes:", error);
    return 0;
  }
  return data.likes;
}
