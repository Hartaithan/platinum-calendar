import { useCallback, useRef } from "react";

export type AbortHandler = () => void;

export const useAbortController = () => {
  const controller = useRef<AbortController | null>(null);

  const abort: AbortHandler = useCallback(() => {
    if (!controller.current) return;
    controller.current.abort("user");
  }, []);

  const getSignal = useCallback(() => {
    if (controller.current) controller.current.abort("superseded");
    controller.current = new AbortController();
    return controller.current.signal;
  }, []);

  const isAborted = useCallback(
    () => controller.current?.signal.aborted ?? false,
    [],
  );

  return { controller, abort, getSignal, isAborted };
};
