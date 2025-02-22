import { readError } from "@/utils/error";
import { drawImage } from "@/utils/image";
import { useCallback, useRef } from "react";
import { toast } from "sonner";

export const useCalendarCapture = () => {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const hiddenRef = useRef<HTMLDivElement | null>(null);

  const capture = useCallback(async (): Promise<Blob | null> => {
    const calendar = calendarRef.current;
    const hidden = hiddenRef.current;
    if (!calendar || !hidden) return null;
    try {
      hidden.innerHTML = "";
      hidden.appendChild(calendar.cloneNode(true));
      const image = await drawImage(hidden);
      if (!image) throw new Error("Unable to generate image");
      hidden.innerHTML = "";
      return image;
    } catch (error) {
      console.error("generate image error", error);
      const message = readError(error);
      toast.error(message);
      return null;
    }
  }, []);

  return { calendarRef, hiddenRef, capture };
};
