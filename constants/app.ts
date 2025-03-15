import type { Theme } from "@/models/app";

export const themes: Theme[] = ["og", "heatmap", "columns"];

export const themesLabels: Record<Theme, string> = {
  og: "Original",
  heatmap: "Heatmap",
  columns: "Columns",
};

export const defaultTheme: Theme = "heatmap";
