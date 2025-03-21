import type { DataKey, Theme } from "@/models/app";

export const themes: Theme[] = ["og", "heatmap", "columns"];

export const themesLabels: Record<Theme, string> = {
  og: "Original",
  heatmap: "Heatmap",
  columns: "Columns",
};

export const dataKeys: DataKey[] = ["platinums", "completes", "collection"];

export const dataLabels: Record<DataKey, string> = {
  platinums: "Platinums",
  completes: "Completes",
  collection: "Platinums + Completes",
};

export const defaultTheme: Theme = "heatmap";
