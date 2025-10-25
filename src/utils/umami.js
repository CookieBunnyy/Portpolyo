// Handles sending custom Umami events safely
export const trackEvent = (eventName, data = {}) => {
  if (window.umami) {
    window.umami.track(eventName, data);
  } else {
    console.warn("Umami not initialized yet:", eventName);
  }
};

export async function getPageViews(websiteId, path, token) {
  const response = await fetch(`https://analytics.umami.is/api/websites/${websiteId}/stats?url=${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data.pageviews?.value || 0;
};
