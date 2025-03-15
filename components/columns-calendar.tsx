"use client";

import DayTooltip from "@/components/day-tooltip";
import { Button } from "@/components/ui/button";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { monthIndex, monthLabels, monthLength } from "@/constants/calendar";
import { useDateDetailsModal } from "@/hooks/use-date-details-modal";
import { useDayParams } from "@/hooks/use-day-params";
import type { BaseMonthProps, DayProps, MonthProps } from "@/models/calendar";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { createArray } from "@/utils/array";
import { getDateKey } from "@/utils/date";
import { pluralize } from "@/utils/string";
import { cn } from "@/utils/styles";
import { memo, type FC } from "react";

const dayColors = [
  ["bg-gray-100", "text-gray-400"],
  ["bg-emerald-200", "text-black"],
  ["bg-emerald-300", "text-black"],
  ["bg-emerald-400", "text-black"],
  ["bg-emerald-500", "text-black"],
  ["bg-emerald-600", "text-white"],
  ["bg-emerald-700", "text-white"],
  ["bg-emerald-800", "text-white"],
  ["bg-emerald-900", "text-white"],
  ["bg-emerald-950", "text-white"],
];

const styles = {
  day: "day w-full h-auto py-1 px-2 flex items-center text-xs",
};

const getDayColor = (count: number) => {
  if (count > 9) return dayColors.at(-1);
  const color = dayColors[count];
  if (!color) return dayColors[0];
  return color;
};

const Day: FC<DayProps> = memo((props) => {
  const { month, day, onDayClick } = props;
  const {
    items,
    hasItems,
    count,
    isTouchDevice,
    isDayVisible,
    date,
    label,
    ariaLabel,
  } = useDayParams({
    month,
    day,
  });
  const dayStyles = cn(
    styles.day,
    getDayColor(count),
    hasItems && "completed-day",
  );

  if (isDayVisible) return null;

  if (!hasItems) return <div className={dayStyles}>{day}</div>;

  if (isTouchDevice) {
    return (
      <Button
        unstyled
        aria-label={ariaLabel}
        className={dayStyles}
        onClick={() => onDayClick({ date, items })}>
        <p>{day}</p>
        <p className="ml-2">{pluralize(count, "plat")}</p>
      </Button>
    );
  }

  return (
    <DayTooltip label={label}>
      <TooltipTrigger
        aria-label={ariaLabel}
        className={dayStyles}
        onClick={() => onDayClick({ date, items })}>
        <p className="w-3 text-left">{day}</p>
        <p className="ml-2">{pluralize(count, "plat")}</p>
      </TooltipTrigger>
    </DayTooltip>
  );
});

const MonthHeader: FC<BaseMonthProps> = memo((props) => {
  const { month } = props;
  const { groups } = useData();
  const { year } = useFilters();
  const key = getDateKey({ month, year });
  const total = groups ? groups[key] : null;
  return (
    <div className="mb-2 flex flex-col justify-between">
      <h3 className="text-sm font-semibold">{monthLabels[month].long}</h3>
      {total && total.length > 0 && (
        <p className="text-xs font-medium">{pluralize(total.length, "plat")}</p>
      )}
    </div>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, onDayClick } = props;
  const count = monthLength[month];
  const days = createArray(count);
  return (
    <div className="flex w-24 flex-col justify-self-center">
      <MonthHeader month={month} />
      <div className="flex flex-1 flex-col gap-1">
        {days.map((day) => (
          <Day
            key={`month-${day}`}
            month={month}
            day={day}
            onDayClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
});

const ColumnsCalendar: FC = () => {
  const { handleDayClick, modal } = useDateDetailsModal();
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex flex-wrap gap-3">
        {monthIndex.map((month) => (
          <Month key={month} month={month} onDayClick={handleDayClick} />
        ))}
      </div>
      {modal}
    </div>
  );
};

export default ColumnsCalendar;
