"use client";

import { monthIndex, monthLength } from "@/constants/calendar";
import type { CalendarProps, DayClickHandler } from "@/models/calendar";
import type { DateKeyParams } from "@/models/date";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { createArray } from "@/utils/array";
import { getDateKey, getDateLabel } from "@/utils/date";
import type { ComponentPropsWithRef } from "react";
import { forwardRef, memo, type FC } from "react";
import { cn } from "@/utils/styles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MonthProps {
  month: string;
  days: number;
  onDayClick: DayClickHandler;
}

interface MarkProps {
  count: number;
}

interface MarkCircleProps extends ComponentPropsWithRef<"div"> {
  color: string;
}

interface DayProps {
  month: string;
  day: number;
  onDayClick: DayClickHandler;
}

interface TotalProps {
  month: string;
  days: number;
}

const headerColors: Record<string, string> = {
  January: "bg-[#99CCFF]",
  February: "bg-[#CCFFFF]",
  March: "bg-[#33CCCC]",
  April: "bg-[#CCFFCC]",
  May: "bg-[#99CC00]",
  June: "bg-[#FFFD99]",
  July: "bg-[#FFCC01]",
  August: "bg-[#FF9901]",
  September: "bg-[#FF6600]",
  October: "bg-[#FF8080]",
  November: "bg-[#CC99FF]",
  December: "bg-[#CCCCFF]",
};

const markColors: Record<number, [string, string]> = {
  1: ["bg-[#C00001]", "text-white"],
  2: ["bg-[#FF0000]", "text-white"],
  3: ["bg-[#FEC000]", "text-black"],
  4: ["bg-[#FFFD02]", "text-black"],
  5: ["bg-[#93D151]", "text-black"],
  6: ["bg-[#03AFEF]", "text-black"],
  7: ["bg-[#0271C1]", "text-white"],
};

const columns: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
};

const getColors = (count: number): [string, string] => {
  if (count === 0) return ["", ""];
  if (count > 7) return markColors[7];
  return markColors[count];
};

const MarkCircle = forwardRef<HTMLDivElement, MarkCircleProps>((props, ref) => {
  const { color, className, children, ...rest } = props;
  return (
    <div
      className={cn(
        "size-7 rounded-full border border-black",
        className,
        color,
      )}
      {...rest}
      ref={ref}>
      {children}
    </div>
  );
});

const Mark: FC<MarkProps> = (props) => {
  const { count } = props;
  if (count <= 0) return null;
  const [bg, text] = getColors(count);
  return (
    <MarkCircle
      color={bg}
      className={cn(
        "absolute inset-0 m-auto flex justify-center items-center",
        bg,
      )}>
      <p className={cn("text-sm", text)}>{count}</p>
    </MarkCircle>
  );
};

const dayStyles =
  "day size-day flex border-r border-r-black border-b border-b-black justify-center items-center relative";

const Day: FC<DayProps> = memo((props) => {
  const { month, day, onDayClick } = props;
  const { year } = useFilters();
  const { groups } = useData();
  const date: DateKeyParams = { day, month: monthIndex[month], year };
  const key = getDateKey(date);
  const platinums = groups ? groups[key] : null;
  const hasPlatinums = !!platinums && platinums.length > 0;

  if (!hasPlatinums) {
    return (
      <div className={dayStyles}>
        <p>{day}</p>
      </div>
    );
  }

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger
        className={dayStyles}
        onClick={() => onDayClick({ date, platinums })}>
        <Mark count={platinums.length} />
      </TooltipTrigger>
      <TooltipContent>
        <p>{getDateLabel(date)}</p>
      </TooltipContent>
    </Tooltip>
  );
});

const Total: FC<TotalProps> = memo((props) => {
  const { month, days } = props;
  const { year } = useFilters();
  const { groups } = useData();
  const key = getDateKey({ month: monthIndex[month], year });
  const total = groups ? groups[key] : null;
  const cols = 35 - days;
  return (
    <div
      className={cn(
        columns[cols],
        "flex justify-center items-center border-r border-r-black border-b border-b-black",
      )}>
      {total && total.length > 0 && <p>{total.length} plats</p>}
    </div>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, days: count, onDayClick } = props;
  const days = createArray(count);
  return (
    <div className="month w-fit flex flex-col border-l border-l-black border-t border-t-black">
      <div
        className={cn(
          "header h-day flex items-center justify-center border-r border-r-black border-b border-b-black",
          headerColors[month],
        )}>
        <p className="font-semibold text-sm">{month}</p>
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <Day
            key={`month-${day}`}
            month={month}
            day={day}
            onDayClick={onDayClick}
          />
        ))}
        <Total days={count} month={month} />
      </div>
    </div>
  );
});

const Legend: FC = () => {
  const colors = Object.entries(markColors);
  return (
    <div className="relative sm:absolute @save:absolute inset-auto sm:inset-y-0 @save:inset-y-0 right-auto sm:-right-20 @save:-right-20 w-auto sm:w-16 @save:w-16 flex flex-row sm:flex-col @save:flex-col gap-1">
      {colors.map(([value, color]) => (
        <div
          key={value}
          className="flex flex-col sm:flex-row @save:flex-row justify-center sm:justify-normal @save:justify-normal items-center">
          <MarkCircle color={color[0]} />
          <p className="ml-0 sm:ml-3 @save:ml-3">{value}</p>
        </div>
      ))}
    </div>
  );
};

const OGCalendar: FC<CalendarProps> = (props) => {
  const { onDayClick } = props;
  const months = Object.entries(monthLength);
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 @save:grid-cols-4 gap-4 justify-items-center">
      <Legend />
      {months.map(([month, days]) => (
        <Month key={month} month={month} days={days} onDayClick={onDayClick} />
      ))}
    </div>
  );
};

export default OGCalendar;
