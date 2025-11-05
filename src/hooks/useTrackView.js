import { useEffect } from "react";
import { trackEvent } from "../utils/umami";

export const useTrackView = (sectionName) => {
  useEffect(() => {
    trackEvent(`${sectionName}_viewed`);
  }, [sectionName]);
};
