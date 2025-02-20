"use client";

import { isSafari } from "@/utils/device";
import type { ComponentProps } from "react";

export const redirect = (
  url: string,
  target: ComponentProps<"a">["target"] = "_self",
) => {
  const link = document.createElement("a");
  link.href = url;
  link.style.display = "none";
  link.target = target;
  document.body.appendChild(link);
  if (isSafari()) confirm("Open the link in a new tab?") && link.click();
  else link.click();
  document.body.removeChild(link);
};
