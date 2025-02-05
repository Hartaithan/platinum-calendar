"use server";

import { cookies } from "next/headers";
import type { Theme } from "@/models/app";
import { defaultTheme, themeKey } from "@/constants/app";

export const getCookieExpires = () => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 365);
  return expires;
};

export const setTheme = async (value: Theme) => {
  cookies().set(themeKey, value, { expires: getCookieExpires() });
};

export const getTheme = async (): Promise<Theme> => {
  const value = cookies().get(themeKey)?.value as Theme | undefined;
  return value || defaultTheme;
};

export const extendTheme = async () => {
  const value = await getTheme();
  await setTheme(value);
};
