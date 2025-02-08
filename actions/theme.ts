"use server";

import { cookies } from "next/headers";
import type { Theme } from "@/models/app";
import { defaultTheme, themeKey } from "@/constants/app";

export const setTheme = async (value: Theme) => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  cookies().set(themeKey, value, { expires });
};

export const getTheme = async (): Promise<Theme> => {
  const value = cookies().get(themeKey)?.value as Theme | undefined;
  return value || defaultTheme;
};
