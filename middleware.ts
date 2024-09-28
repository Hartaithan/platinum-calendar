import type { NextRequest } from "next/server";
import { NextResponse, type NextMiddleware } from "next/server";
import { getCookieExpires } from "@/utils/cookies";
import { defaultTheme, themeKey } from "@/constants/app";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|favicon.ico).*)",
};

const extendCookies = (req: NextRequest, res: NextResponse) => {
  const theme = req.cookies.get(themeKey)?.value || defaultTheme;
  const expires = getCookieExpires();
  if (theme) res.cookies.set(themeKey, theme, { expires });
  return res;
};

export const middleware: NextMiddleware = async (req) => {
  const res = NextResponse.next();
  return extendCookies(req, res);
};
