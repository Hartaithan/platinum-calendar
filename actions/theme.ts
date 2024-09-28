"use server";

import { cookies } from "next/headers";
import type { Theme } from "@/models/app";
import { getCookieExpires } from "@/utils/cookies";
import { defaultTheme, themeKey } from "@/constants/app";

export const setTheme = async (value: Theme) => {
  cookies().set(themeKey, value, {
    expires: getCookieExpires(),
  });
};

export const getTheme = async (): Promise<Theme> => {
  const value = cookies().get(themeKey)?.value as Theme | undefined;
  return value || defaultTheme;
};
