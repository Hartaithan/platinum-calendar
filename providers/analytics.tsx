"use client";

import { APP_NAME } from "@/constants/app";
import { APP_URL, APP_VERSION, POSTHOG_KEY } from "@/constants/variables";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import type { FC, PropsWithChildren } from "react";

const NODE = process.env.NODE_ENV;
const VERCEL = process.env.NEXT_PUBLIC_VERCEL_ENV;
const VERCEL_PUBLIC = process.env.NEXT_PUBLIC_VERCEL_ENV;

const environment = VERCEL || VERCEL_PUBLIC || NODE;

const isClientSide = typeof window !== "undefined";
const isProd = environment === "production";

if (isClientSide && isProd) {
  posthog.init(POSTHOG_KEY, {
    api_host: APP_URL + "/sync",
    person_profiles: "identified_only",
    defaults: "2025-11-30",
    // only basic events
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    // disable unnecessary features
    rageclick: false,
    disable_surveys: true,
    capture_dead_clicks: false,
    capture_performance: false,
    disable_session_recording: true,
    // disable feature flags and extra network requests
    advanced_disable_flags: true,
    advanced_disable_toolbar_metrics: true,
    advanced_disable_feature_flags_on_first_load: true,
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  });
  posthog.register({ app: APP_NAME, app_version: APP_VERSION });
}

export const getPostHog = () => (posthog.__loaded ? posthog : null);

const AnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  if (!isProd) return children;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default AnalyticsProvider;
