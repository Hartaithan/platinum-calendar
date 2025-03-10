import type { DateKeyParams } from "@/models/date";

export interface DateDetails {
  date: DateKeyParams;
  items: string[] | null;
}

export type DayClickHandler = (details: DateDetails) => void;

export interface BaseMonthProps {
  month: number;
}

export type DayLabelKey = "long" | "short";

export type DayLabel = Record<DayLabelKey, string>;
