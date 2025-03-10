"use client";

import DayTooltip from "@/components/day-tooltip";
import { Button } from "@/components/ui/button";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { monthIndex, monthLabels, monthLength } from "@/constants/calendar";
import { useDateDetailsModal } from "@/hooks/use-date-details-modal";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { BaseMonthProps, DayClickHandler } from "@/models/calendar";
import type { DateKeyParams } from "@/models/date";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { useSettings } from "@/providers/settings";
import { createArray } from "@/utils/array";
import { checkLeapDay } from "@/utils/calendar";
import { getDateKey, getDateLabel } from "@/utils/date";
import { getPlatinumsListItems } from "@/utils/group";
import { pluralize } from "@/utils/string";
import { cn } from "@/utils/styles";
import { memo, type FC } from "react";

interface MonthProps extends BaseMonthProps {
  onDayClick: DayClickHandler;
}

interface DayProps extends BaseMonthProps {
  day: number;
  onDayClick: DayClickHandler;
}

const dayColors = [
  ["bg-gray-100", "text-black"],
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
  day: "day size-6 flex justify-center items-center text-sm",
};

const getDayColor = (count: number) => {
  if (count > 9) return dayColors.at(-1);
  const color = dayColors[count];
  if (!color) return dayColors[0];
  return color;
};

const Day: FC<DayProps> = memo((props) => {
  const { month, day, onDayClick } = props;
  const { groups, completes } = useData();
  const { year } = useFilters();
  const { settings } = useSettings();
  const date: DateKeyParams = { day, month, year };
  const key = getDateKey(date);
  const { items, count, hasItems } = getPlatinumsListItems({
    key,
    groups,
    completes,
    settings,
  });
  const isTouchDevice = useMediaQuery("(pointer: coarse)");
  const label = getDateLabel({ date });
  const { isDayVisible } = checkLeapDay({ ...date, settings });
  const ariaLabel = `${label}: Show details`;
  const dayStyles = cn(
    styles.day,
    getDayColor(count),
    hasItems && "completed-day",
  );

  if (isDayVisible) return null;

  if (!hasItems)
    return <div className={cn(dayStyles, "text-gray-400")}>{day}</div>;

  if (isTouchDevice) {
    return (
      <Button
        unstyled
        aria-label={ariaLabel}
        className={dayStyles}
        onClick={() => onDayClick({ date, items })}>
        {count}
      </Button>
    );
  }

  return (
    <DayTooltip label={label}>
      <TooltipTrigger
        aria-label={ariaLabel}
        className={dayStyles}
        onClick={() => onDayClick({ date, items })}>
        {count}
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
    <div className="mb-2 flex items-center justify-between">
      <h3 className="font-semibold">{monthLabels[month].long}</h3>
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
    <div className="flex w-fit flex-col justify-self-center">
      <MonthHeader month={month} />
      <div className="grid grid-cols-7 gap-1.5">
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

const Legend: FC = () => {
  return (
    <div className="flex w-full justify-center @save:justify-end lg:justify-end">
      <div className="mt-6 grid grid-cols-[1fr_1fr] gap-y-1 @save:grid-cols-[1fr_auto_1fr] @save:gap-y-0 md:grid-cols-[1fr_auto_1fr] md:gap-y-0">
        <span className="col-[1/2] row-[1/2] mr-2 text-left text-sm @save:col-auto @save:row-auto md:col-auto md:row-auto">
          Less
        </span>
        <div className="col-[1/3] row-[2/3] flex gap-1 @save:col-auto @save:row-auto md:col-auto md:row-auto">
          {dayColors.map(([bg, fg], index) => (
            <div
              key={`legend-${index}`}
              className={cn(
                "flex size-5 items-center justify-center text-[12px] leading-[normal] text-white",
                bg,
                fg,
              )}>
              {index}
            </div>
          ))}
        </div>
        <span className="col-[2/3] row-[1/2] ml-2 text-right text-sm @save:col-auto @save:row-auto md:col-auto md:row-auto">
          More
        </span>
      </div>
    </div>
  );
};

const HeatMapCalendar: FC = () => {
  const { handleDayClick, modal } = useDateDetailsModal();
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 @save:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {monthIndex.map((month) => (
          <Month key={month} month={month} onDayClick={handleDayClick} />
        ))}
      </div>
      <Legend />
      {modal}
    </div>
  );
};

export default HeatMapCalendar;
