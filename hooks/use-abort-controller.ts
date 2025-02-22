import posthog from "posthog-js";
import { useCallback, useRef } from "react";

export const useAbortController = () => {
  const controller = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (!controller.current) return;
    controller.current.abort("The user canceled the data download");
    posthog.capture("submit-cancelled");
  }, []);

  return { controller, abort };
};
