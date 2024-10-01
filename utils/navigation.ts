"use client";

import type { ComponentProps } from "react";

const isSafari = () => {
  const agent = navigator.userAgent;
  return agent.indexOf("Safari") !== -1 && agent.indexOf("Chrome") === -1;
};

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
