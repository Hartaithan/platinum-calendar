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
import { getDateKey, getDateLabel } from "@/utils/date";
import { cn } from "@/utils/styles";
import { memo, type FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MonthProps extends BaseMonthProps {
  onDayClick: DayClickHandler;
}

interface DayProps extends BaseMonthProps {
  day: number;
  onDayClick: DayClickHandler;
}

const dayColors = [
  "bg-gray-100",
  "bg-emerald-200",
  "bg-emerald-300",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-emerald-700",
  "bg-emerald-800",
  "bg-emerald-900",
  "bg-emerald-950",
];

const styles = {
  day: "day size-7",
};

const getDayColor = (count: number) => {
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

  if (!hasPlatinums) {
    return <div className={cn(styles.day, getDayColor(count))} />;
  }

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger
        className={cn(styles.day, getDayColor(count))}
        onClick={() => onDayClick({ date, platinums })}
      />
      <TooltipContent>
        <p>{getDateLabel(date)}</p>
      </TooltipContent>
    </Tooltip>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, onDayClick } = props;
  const count = monthLength[month];
  const days = createArray(count);
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold mb-2">{monthLabels[month].long}</h3>
      <div className="grid grid-cols-7 gap-1">
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
    <div className="flex-grow flex items-end">
      <div className="mt-6 flex items-center justify-end">
        <span className="text-sm mr-2">Less</span>
        <div className="flex gap-1">
          {dayColors.map((color) => (
            <div key={color} className={cn("size-5", color)} />
          ))}
        </div>
        <span className="text-sm ml-2">More</span>
      </div>
    </div>
  );
};

const HeatMapCalendar: FC<CalendarProps> = (props) => {
  const { onDayClick } = props;
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 gap-4">
        {monthIndex.map((month) => (
          <Month key={month} month={month} onDayClick={onDayClick} />
        ))}
      </div>
      <Legend />
    </div>
  );
};

export default HeatMapCalendar;
