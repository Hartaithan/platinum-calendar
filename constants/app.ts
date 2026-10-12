import type { DataKey, Theme } from "@/models/app";
import type { AppName } from "@hartaithan/trophy-scout";

export const APP_NAME: AppName = "platinum-calendar";

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
