"use client";

import { APP_NAME } from "@/constants/app";
import { getPostHog } from "@/providers/analytics";
import { createClient } from "@hartaithan/trophy-scout";

export const API = createClient({ app: APP_NAME, analytics: getPostHog });
