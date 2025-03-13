"use client";

import { useTheme } from "@/providers/theme";
import { captureElement } from "@/utils/capture";
import { readError } from "@/utils/error";
import type { RefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type FC,
  type PropsWithChildren,
} from "react";
import { toast } from "sonner";

interface Context {
  captureRef: RefObject<HTMLDivElement>;
  capture: () => Promise<Blob | null>;
}

const initialValue: Context = {
  captureRef: { current: null },
  capture: async () => null,
};

const Context = createContext<Context>(initialValue);

const CaptureProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const captureRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const capture = useCallback(async (): Promise<Blob | null> => {
    const calendar = captureRef.current;
    const hidden = tempRef.current;
    if (!calendar || !hidden) return null;
    try {
      hidden.innerHTML = "";
      hidden.appendChild(calendar.cloneNode(true));
      const image = await captureElement(hidden, theme);
      if (!image) throw new Error("Unable to generate image");
      hidden.innerHTML = "";
      return image;
    } catch (error) {
      console.error("generate image error", error);
      const message = readError(error);
      toast.error(message);
      return null;
    }
  }, [theme]);

  const exposed: Context = useMemo(
    () => ({ captureRef, capture }),
    [captureRef, capture],
  );

  return (
    <Context.Provider value={exposed}>
      {children}
      <div className="fixed -left-full top-0 -z-50 h-full w-full overflow-hidden">
        <div
          className="flex h-[800px] w-[1200px] flex-col @container"
          ref={tempRef}
        />
      </div>
    </Context.Provider>
  );
};

export const useCapture = (): Context => useContext(Context);

export default CaptureProvider;
