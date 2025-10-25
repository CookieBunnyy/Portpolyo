import { useEffect } from "react";
import { trackEvent } from "../utils/umami";

// Custom hook to track when a section is viewed
export const useTrackView = (sectionName) => {
  useEffect(() => {
    trackEvent(`${sectionName}_viewed`);
  }, [sectionName]);
};
