"use client";

import { APP_URL } from "@/constants/variables";
import { isMobile } from "@/utils/device";
import type { Options } from "modern-screenshot";
import { domToBlob } from "modern-screenshot";

type Step = "final" | "pre";

const options: Record<Step, Options> = {
  pre: {
    quality: 1,
    type: "image/png",
  },
  final: {
    scale: 2,
    quality: 1,
    type: "image/png",
    drawImageInterval: 1000,
    backgroundColor: "#FFFFFF",
    fetch: { bypassingCache: true },
  },
};

export const drawImage = async (
  element: HTMLDivElement | null,
): Promise<Blob | null> => {
  if (!element) return null;
  try {
    await domToBlob(element, options.pre);
    if (isMobile()) await domToBlob(element, options.pre);
    const image = await domToBlob(element, options.final);
    return image;
  } catch (error) {
    console.error("draw image error", error);
    return null;
  }
};

export const getProxyURL = (url: string): string => {
  const parsed = new URL(url);
  const path = parsed.pathname;
  return APP_URL + "/api/proxy" + path;
};
