import type { Theme } from "@/models/app";

export const themes: Theme[] = ["og", "heatmap"];

export const themesLabels: Record<Theme, string> = {
  og: "OG",
  heatmap: "HeatMap",
};

export const defaultTheme: Theme = "og";
