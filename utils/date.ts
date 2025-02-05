import { monthLabels } from "@/constants/calendar";
import type { DayLabelKey } from "@/models/calendar";
import type { DateKey, DateKeyParams } from "@/models/date";
import { pluralize } from "@/utils/string";

export const getDateKey = (params: DateKeyParams): string => {
  const { day, month, year } = params;
  const d = day ? day.toString() : "X";
  const m = month ? month.toString() : "X";
  const y = year ? year.toString() : "X";
  return `${d}.${m}.${y}`;
};

export const getDateKeys = (value: string): Record<DateKey, string> => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return {
    fullDate: getDateKey({ day, month, year }),
    dayAndMonth: getDateKey({ day, month }),
    month: getDateKey({ month }),
    monthAndYear: getDateKey({ month, year }),
  };
};

interface DateLabelParams {
  date: DateKeyParams;
  key?: DayLabelKey;
  count?: number;
}

export const getDateLabel = (params: DateLabelParams): string => {
  const { date, key = "long" } = params;
  const { day, month, year } = date;
  const result: string[] = [];
  if (day) result.push(day.toString());
  if (month) result.push(monthLabels[month][key]);
  if (year) result.push(year.toString());
  if (result.length === 0) return "Date Not Found!";
  return result.join(" ");
};

export const getDateLabelWithCount = (params: DateLabelParams): string => {
  const { count } = params;
  const label = getDateLabel(params);
  if (count) return `${label}, ${pluralize(count, "plat")}`;
  return label;
};
