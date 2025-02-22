import HeatMapCalendar from "@/components/heatmap-calendar";
import OGCalendar from "@/components/og-calendar";
import { defaultTheme } from "@/constants/app";
import type { Theme } from "@/models/app";
import { useTheme } from "@/providers/theme";
import type { FC } from "react";

const calendars: Record<Theme, FC> = {
  og: OGCalendar,
  heatmap: HeatMapCalendar,
};

export const useCalendar = () => {
  const { theme } = useTheme();
  const Calendar = calendars[theme || defaultTheme];
  return { Calendar };
};
