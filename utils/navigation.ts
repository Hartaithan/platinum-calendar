import type { ComponentProps } from "react";

export const redirectTo = (
  url: string,
  target: ComponentProps<"a">["target"] = "_self",
) => {
  const link = document.createElement("a");
  link.href = url;
  link.style.display = "none";
  link.target = target;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
