import type { Theme } from "@/models/app";

export const themes: Theme[] = ["og", "heatmap"];

export const themesLabels: Record<Theme, string> = {
  og: "Original",
  heatmap: "HeatMap",
};

export const defaultTheme: Theme = "og";

export const themeKey = "plat-cal-theme";
