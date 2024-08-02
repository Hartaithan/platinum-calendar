import type { DateKeyParams } from "@/models/date";

export interface DateDetails {
  date: DateKeyParams;
  platinums: string[] | null;
}

export type DayClickHandler = (details: DateDetails) => void;

export interface CalendarProps {
  onDayClick: DayClickHandler;
}
