import { useState, useEffect } from "react";

export default function useProfileViews() {
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (import.meta.env.DEV) return; // Only fetch on deploy

    const fetchViews = async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/getPageViews?path=/profile`
        );
        const data = await res.json();
        setViews(data.views || 0);
      } catch (err) {
        console.error("Error fetching profile views:", err);
      }
    };

    fetchViews();
  }, []);

  return views;
}
