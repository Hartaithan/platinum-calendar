"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import type { FC, PropsWithChildren } from "react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "";

const environment = process.env.VERCEL_ENV || process.env.NODE_ENV;
const isClientSide = typeof window !== "undefined";
const isProd = environment === "production";

if (isClientSide && isProd) {
  posthog.init(KEY, { api_host: HOST, person_profiles: "identified_only" });
}

const AnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  if (!isProd) return children;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default AnalyticsProvider;
