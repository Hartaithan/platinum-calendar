"use client";

import { themeKey } from "@/constants/app";

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
