// Handles sending custom Umami events safely
export const trackEvent = (eventName, data = {}) => {
  if (window.umami) {
    window.umami.track(eventName, data);
  } else {
    console.warn("Umami not initialized yet:", eventName);
  }
};
