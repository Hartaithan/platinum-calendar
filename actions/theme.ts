"use server";

import { defaultTheme, themeKey } from "@/constants/app";
import type { Theme } from "@/models/app";
import { cookies } from "next/headers";

export const setTheme = async (value: Theme) => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  cookies().set(themeKey, value, { expires });
};

export const getTheme = async (): Promise<Theme> => {
  const value = cookies().get(themeKey)?.value as Theme | undefined;
  return value || defaultTheme;
};
