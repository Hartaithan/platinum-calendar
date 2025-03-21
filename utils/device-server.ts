import { headers } from "next/headers";

export const detectBrowser = () => {
  const ua = headers().get("user-agent");
  const cleaned = ua ? ua.toLowerCase() : "";
  if (/chrome/.test(cleaned) && !/edg|opr|brave/.test(cleaned)) return "chrome";
  if (/firefox/.test(cleaned)) return "firefox";
  if (/safari/.test(cleaned) && !/chrome/.test(cleaned)) return "safari";
  return "unknown";
};
