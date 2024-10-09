import { monthKeys, monthLabels } from "@/constants/calendar";
import { notFound } from "@/constants/messages";
import type { DayLabelKey } from "@/models/calendar";
import type { DateKey, DateKeyParams } from "@/models/date";
import { cleanString, pad, pluralize } from "@/utils/string";

const datePattern =
  /(\d{1,2})(st|nd|rd|th)\s(\w{3})\s(\d{4})(\d{1,2}:\d{2}:\d{2})\s(AM|PM)/;

export const convertParsedDate = (date: string): string => {
  const cleaned = cleanString(date);
  const match = cleaned.match(datePattern);

  if (!match) return notFound;

  const [, day, , month, year, time, period] = match;
  const dayFormatted = pad(day);
  const monthKey = monthKeys[month];

  if (!monthKey) return notFound;

  let [hours, minutes, seconds] = time.split(":");
  if (period === "PM" && hours !== "12") {
    hours = (Number(hours) + 12).toString();
  } else if (period === "AM" && hours === "12") {
    hours = "00";
  }

  const timeFormatted = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  const isoDate = `${year}-${monthKey}-${dayFormatted}T${timeFormatted}Z`;
  return isoDate;
};

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

export const getDateLabelWithCount = (
  params: DateLabelParams,
  count?: number,
): string => {
  const label = getDateLabel(params);
  if (count) return `${label}, ${pluralize(count, "plat")}`;
  return label;
};
