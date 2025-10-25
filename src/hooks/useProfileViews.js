import { useState, useEffect } from "react";
import { getPageViews } from "../utils/umami";

export default function useProfileViews() {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    const token = import.meta.env.VITE_UMAMI_API_TOKEN;

    async function fetchViews() {
      try {
        const count = await getPageViews(websiteId, "/profile", token);
        setViews(count);
      } catch (err) {
        console.error("Error fetching profile views:", err);
      }
    }

    fetchViews();
  }, []);

  return views;
}
