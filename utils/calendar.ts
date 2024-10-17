import type { Settings } from "@/models/app";
import type { DateKeyParams } from "@/models/date";

interface LeapDayParams extends DateKeyParams {
  settings: Settings;
}

export const checkLeapDay = (params: LeapDayParams) => {
  const isLeapMonth = params?.month === 2;
  const isLeapDay = params?.day === 29 && isLeapMonth;
  const isLeapVisible = params?.settings.leap !== true;
  const isDayVisible = isLeapDay && isLeapVisible;
  const isTotalVisible = isLeapMonth && isLeapVisible;
  return { isDayVisible, isTotalVisible };
};
