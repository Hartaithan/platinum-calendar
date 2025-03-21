import { useMediaQuery } from "@/hooks/use-media-query";
import type { DayProps } from "@/models/calendar";
import type { DateKeyParams } from "@/models/date";
import type { NullableGroupedPlatinumData } from "@/models/platinum";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { useSettings } from "@/providers/settings";
import { checkLeapDay } from "@/utils/calendar";
import { getDateKey, getDateLabel } from "@/utils/date";
import { getPlatinumsListItems } from "@/utils/group";

type Params = Omit<DayProps, "onDayClick">;

export const useDayParams = (params: Params) => {
  const { month, day } = params;

  const { platinums, completes, collection } = useData();
  const { year } = useFilters();
  const { settings } = useSettings();
  const date: DateKeyParams = { day, month, year };
  const key = getDateKey(date);
  const payload: NullableGroupedPlatinumData = {
    platinums,
    completes,
    collection,
  };
  const { items, count, hasItems } = getPlatinumsListItems({
    key,
    payload,
    settings,
  });
  const isTouchDevice = useMediaQuery("(pointer: coarse)");
  const label = getDateLabel({ date });
  const { isDayVisible } = checkLeapDay({ ...date, settings });
  const ariaLabel = `${label}: Show details`;

  return {
    items,
    hasItems,
    count,
    isTouchDevice,
    isDayVisible,
    date,
    label,
    ariaLabel,
  };
};
