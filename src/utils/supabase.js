import { createClient } from "@supabase/supabase-js";

// Use either .env variables or hardcoded for testing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://sbcvbaxnpwybzkjitfsm.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_IV69thWbe9X9Z5ms-Ss40Q_t0NHf1he";

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getLikes() {
  try {
    const { data, error } = await supabase
      .from("profile_likes")
      .select("likes")
      .eq("id", 1)
      .maybeSingle();

    if (error) throw error;
    return data?.likes || 0;
  } catch (err) {
    console.error("Error fetching likes:", err.message);
    return 0;
  }
}

// Increment likes
export async function incrementLikes() {
  try {
    const { data, error } = await supabase
      .from("profile_likes")
      .update({ likes: supabase.increment(1) }) // ✅ correct v2 syntax
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