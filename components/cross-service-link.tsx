"use client";

import Script from "next/script";
import posthog from "posthog-js";
import type { FC } from "react";
import { useCallback } from "react";

const CrossServiceLink: FC = () => {
  const onLoad = useCallback(() => {
    document.addEventListener(
      "cross-service-link:ready",
      () => {
        const onLinkClick = (link: string) =>
          posthog.capture("link-click", { link });
        const onLearnMoreClick = () => posthog.capture("learn-more-click");
        const onNeverShowClick = () => posthog.capture("never-show-click");
        const onCloseClick = () => posthog.capture("close-click");
        const widget = new window.CrossServiceLink({
          target: document.body,
          theme: "light",
          events: {
            onLinkClick,
            onLearnMoreClick,
            onNeverShowClick,
            onCloseClick,
          },
        });
        widget.mount();
      },
      { once: true },
    );
  }, []);
  return (
    <Script
      src="https://cross-service-link.vercel.app/loader.js"
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  );
};

export default CrossServiceLink;
