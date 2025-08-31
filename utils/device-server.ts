import type { Device } from "@/models/app";
import { headers } from "next/headers";

const isDesktop = (ua: string) => /Windows NT|Macintosh|Linux.*X11/i.test(ua);
const isMobile = (ua: string) => /Mobile|Tablet/i.test(ua);

export const detectBrowser = () => {
  const ua = headers().get("user-agent");
  const cleaned = ua ? ua.toLowerCase() : "";
  if (/chrome/.test(cleaned) && !/edg|opr|brave/.test(cleaned)) return "chrome";
  if (/firefox/.test(cleaned)) return "firefox";
  if (/safari/.test(cleaned) && !/chrome/.test(cleaned)) return "safari";
  return "unknown";
};

export const getDeviceType = (): Device => {
  const ua = headers().get("user-agent") || "";
  return isDesktop(ua) && !isMobile(ua) ? "desktop" : "mobile";
};
