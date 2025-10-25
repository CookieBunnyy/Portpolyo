// src/utils/umami.js

// Logs custom events to Umami safely
export const trackEvent = (eventName, data = {}) => {
  if (window.umami) {
    window.umami.track(eventName, data);
  } else {
    console.warn("Umami not initialized yet:", eventName);
  }
};

// Fetch page views securely via your Netlify serverless function
export async function getPageViews(_, path = "/profile") {
  try {
    const response = await fetch(
      `/.netlify/functions/getPageViews?path=${path}`
    );
    const data = await response.json();
    return data.views || 0;
  } catch (error) {
    console.error("Error fetching page views:", error);
    return 0;
  }
}
