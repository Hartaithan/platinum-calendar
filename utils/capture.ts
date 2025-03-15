"use client";

import type { Theme } from "@/models/app";
import { isMobile } from "@/utils/device";
import type { Options } from "modern-screenshot";
import { domToBlob } from "modern-screenshot";

type Step = "final" | "pre";

type GetOptions = (theme: Theme) => Options;

// TODO: fix long drawing on second call and remove this
const timeout = 2000;

const background: Record<Theme, string> = {
  og: "#FFFFFF",
  heatmap: "#010409",
  columns: "#FFFFFF",
};

const options: Record<Step, GetOptions> = {
  pre: () => ({
    quality: 1,
    type: "image/png",
    timeout,
  }),
  final: (theme) => ({
    scale: 2,
    quality: 1,
    type: "image/png",
    captureElementInterval: 1000,
    backgroundColor: background[theme],
    fetch: { bypassingCache: true },
    timeout,
  }),
};

export const captureElement = async (
  element: HTMLDivElement | null,
  theme: Theme,
): Promise<Blob | null> => {
  if (!element) return null;
  try {
    const pre = options.pre(theme);
    const final = options.final(theme);
    await domToBlob(element, pre);
    if (isMobile()) await domToBlob(element, pre);
    const image = await domToBlob(element, final);
    return image;
  } catch (error) {
    console.error("draw image error", error);
    return null;
  }
};
