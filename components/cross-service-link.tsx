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
          posthog.capture("promo_widget_clicked", { action: "link", link });
        const onLearnMoreClick = () =>
          posthog.capture("promo_widget_clicked", { action: "learn_more" });
        const onNeverShowClick = () =>
          posthog.capture("promo_widget_clicked", { action: "never_show" });
        const onCloseClick = () =>
          posthog.capture("promo_widget_clicked", { action: "close" });
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
