"use server";

import { cookies } from "next/headers";
import type { Theme } from "@/models/app";
import { getCookieExpires } from "@/utils/cookies";
import { defaultTheme } from "@/constants/app";

const key = "plat-cal-theme";

export const setTheme = async (value: Theme) => {
  cookies().set(key, value, {
    expires: getCookieExpires(),
  });
};

export const getTheme = async (): Promise<Theme> => {
  const value = cookies().get(key)?.value as Theme | undefined;
  return value || defaultTheme;
};
