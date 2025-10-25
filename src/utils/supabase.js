import { createClient } from "@supabase/supabase-js";

// Environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with proper headers
export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      apikey: supabaseKey,
      Accept: "application/json",
    },
  },
});

// Fetch likes from row with id=1
export async function getLikes() {
  try {
    const { data, error } = await supabase
      .from("profile_likes")
      .select("likes")
      .eq("id", 1)
      .single();

    if (error) throw error;
    return data?.likes || 0;
  } catch (err) {
    console.error("Error fetching likes:", err.message);
    return 0;
  }
}

// Increment likes using update
export async function incrementLikes() {
  try {
    const { data, error } = await supabase
      .from("profile_likes")
      .update({ likes: supabase.literal("likes + 1") }) // increment likes
      .eq("id", 1)
      .select()
      .single();

    if (error) throw error;
    return data?.likes || 0;
  } catch (err) {
    console.error("Error incrementing likes:", err.message);
    return 0;
  }
}
