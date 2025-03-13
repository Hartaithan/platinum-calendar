"use client";

import { APP_URL } from "@/constants/variables";

export const getProxyURL = (url: string): string => {
  const parsed = new URL(url);
  const path = parsed.pathname;
  return APP_URL + "/api/proxy" + path;
};
