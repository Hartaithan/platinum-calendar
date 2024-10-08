import type { Options } from "modern-screenshot";

export const imageOptions: Options = {
  scale: 2,
  quality: 1,
  type: "image/png",
  drawImageInterval: 1000,
  backgroundColor: "#FFFFFF",
  fetch: { bypassingCache: true },
};
