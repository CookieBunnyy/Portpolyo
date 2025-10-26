import { createClient } from "@supabase/supabase-js";

// Load environment variables (Vite + Netlify)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: check env variables
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or API key is missing!");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch likes safely
export async function getLikes() {
  try {
    const { data, error } = await supabase
      .from("profile_likes")
      .select("likes")
      .eq("id", 1)
      .maybeSingle(); // ✅ prevents 406 if row missing

    if (error) throw error;
    return data?.likes || 0;
  } catch (err) {
    console.error("Error fetching likes:", err.message);
    return 0;
  }
}

// Increment likes safely
export async function incrementLikes() {
  try {
    const { data, error } = await supabase
      .from("profile_likes")
      .update({ likes: { increment: 1 } }) // ✅ correct increment syntax
      .eq("id", 1)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data?.likes || 0;
  } catch (err) {
    console.error("Error incrementing likes:", err.message);
    return 0;
  }
}
