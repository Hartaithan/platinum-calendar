"use client";

export const isSafari = () => {
  if (typeof window === "undefined") return false;
  const agent = window.navigator.userAgent;
  return agent.indexOf("Safari") !== -1 && agent.indexOf("Chrome") === -1;
};

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(hover: hover)").matches;
};
