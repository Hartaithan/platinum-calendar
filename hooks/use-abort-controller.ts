import posthog from "posthog-js";
import { useCallback, useRef } from "react";

export const useAbortController = () => {
  const controller = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (!controller.current) return;
    controller.current.abort("The user canceled the data download");
    posthog.capture("submit-cancelled");
  }, []);

  const getSignal = useCallback(() => {
    if (controller.current) controller.current.abort();
    controller.current = new AbortController();
    return controller.current.signal;
  }, []);

  return { controller, abort, getSignal };
};
