"use client";

import { monthIndex, monthLabels, monthLength } from "@/constants/calendar";
import type {
  BaseMonthProps,
  CalendarProps,
  DayClickHandler,
} from "@/models/calendar";
import type { DateKeyParams } from "@/models/date";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { createArray } from "@/utils/array";
import { getDateKey, getDateLabelWithCount } from "@/utils/date";
import { cn } from "@/utils/styles";
import { memo, type FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  day: "day size-6",
};

const getDayColor = (count: number) => {
  if (count > 9) return dayColors.at(-1);
  const color = dayColors[count];
  if (!color) return dayColors[0];
  return color;
};

const Day: FC<DayProps> = memo((props) => {
  const { month, day, onDayClick } = props;
  const { year } = useFilters();
  const { groups } = useData();
  const date: DateKeyParams = { day, month, year };
  const key = getDateKey(date);
  const platinums = groups ? groups[key] : null;
  const count = platinums?.length || 0;
  const hasPlatinums = !!platinums && platinums.length > 0;
  const isTouchDevice = useMediaQuery("(pointer: coarse)");
  const dayStyles = cn(styles.day, getDayColor(count));

  if (!hasPlatinums) return <div className={dayStyles} />;

  if (isTouchDevice) {
    return (
      <Button
        unstyled
        className={dayStyles}
        onClick={() => onDayClick({ date, platinums })}
      />
    );
  }

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger
        className={dayStyles}
        onClick={() => onDayClick({ date, platinums })}
      />
      <TooltipContent>
        <p>{getDateLabelWithCount({ date }, count)}</p>
      </TooltipContent>
    </Tooltip>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, onDayClick } = props;
  const count = monthLength[month];
  const days = createArray(count);
  return (
    <div className="flex flex-col w-fit justify-self-center">
      <h3 className="font-semibold mb-2">{monthLabels[month].long}</h3>
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
    <div className="w-full flex justify-center lg:justify-end @save:justify-end">
      <div className="mt-6 grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_auto_1fr] @save:grid-cols-[1fr_auto_1fr] gap-y-1 md:gap-y-0 @save:gap-y-0">
        <span className="text-sm mr-2 row-[1/2] md:row-auto @save:row-auto col-[1/2] md:col-auto @save:col-auto text-left">
          Less
        </span>
        <div className="flex gap-1 row-[2/3] md:row-auto @save:row-auto col-[1/3] md:col-auto @save:col-auto">
          {dayColors.map(([bg, fg], index) => (
            <div
              key={`legend-${index}`}
              className={cn("size-5 flex justify-center items-center", bg)}>
              <p className={cn("text-white text-[12px] leading-[normal]", fg)}>
                {index}
              </p>
            </div>
          ))}
        </div>
        <span className="text-sm ml-2 row-[1/2] md:row-auto @save:row-auto col-[2/3] md:col-auto @save:col-auto text-right">
          More
        </span>
      </div>
    </div>
  );
};

const HeatMapCalendar: FC<CalendarProps> = (props) => {
  const { onDayClick } = props;
  return (
    <div className="flex flex-col flex-1 justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 @save:grid-cols-4 gap-4">
        {monthIndex.map((month) => (
          <Month key={month} month={month} onDayClick={onDayClick} />
        ))}
      </div>
      <Legend />
    </div>
  );
};

export default HeatMapCalendar;
