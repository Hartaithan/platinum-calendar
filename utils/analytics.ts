"use client";

import { themeKey } from "@/constants/storage";
import { debounce } from "@/utils/async";
import type { PostHog } from "posthog-js";
import posthog from "posthog-js";

export const withTheme = (event: Object) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === themeKey) {
      return { theme: decodeURIComponent(value), ...event };
    }
  }
  return event;
};

type Capture = PostHog["capture"];

export const debouncedCapture = debounce(
  (...args: Capture["arguments"]) => posthog.capture(args),
  1500,
) as Capture;
