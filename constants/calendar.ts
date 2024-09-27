import type { DayLabel } from "@/models/calendar";

export const monthLength: Record<number, number> = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

export const monthKeys: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export const monthIndex = Array.from({ length: 12 }, (_, i) => i + 1);

export const monthLabels: Record<number, DayLabel> = {
  1: { long: "January", short: "Jan" },
  2: { long: "February", short: "Feb" },
  3: { long: "March", short: "Mar" },
  4: { long: "April", short: "Apr" },
  5: { long: "May", short: "May" },
  6: { long: "June", short: "Jun" },
  7: { long: "July", short: "Jul" },
  8: { long: "August", short: "Aug" },
  9: { long: "September", short: "Sep" },
  10: { long: "October", short: "Oct" },
  11: { long: "November", short: "Nov" },
  12: { long: "December", short: "Dec" },
};
