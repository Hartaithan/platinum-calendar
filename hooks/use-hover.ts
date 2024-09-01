import { useCallback, useEffect, useRef, useState } from "react";

export function useHover<T extends HTMLElement = HTMLDivElement>() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", onMouseEnter);
      ref.current.addEventListener("mouseleave", onMouseLeave);

      return () => {
        ref.current?.removeEventListener("mouseenter", onMouseEnter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current?.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    return undefined;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, hovered };
}
