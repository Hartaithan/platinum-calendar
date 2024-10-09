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
import type { ComponentPropsWithRef } from "react";
import { forwardRef, memo, type FC } from "react";
import { cn } from "@/utils/styles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { pluralize } from "@/utils/string";

interface MonthProps extends BaseMonthProps {
  onDayClick: DayClickHandler;
}

interface MarkProps {
  count: number;
}

interface MarkCircleProps extends ComponentPropsWithRef<"div"> {
  color: string;
}

interface DayProps extends BaseMonthProps {
  day: number;
  onDayClick: DayClickHandler;
}

interface TotalProps extends BaseMonthProps {
  days: number;
}

const headerColors: Record<number, string> = {
  1: "bg-[#99CCFF]",
  2: "bg-[#CCFFFF]",
  3: "bg-[#33CCCC]",
  4: "bg-[#CCFFCC]",
  5: "bg-[#99CC00]",
  6: "bg-[#FFFD99]",
  7: "bg-[#FFCC01]",
  8: "bg-[#FF9901]",
  9: "bg-[#FF6600]",
  10: "bg-[#FF8080]",
  11: "bg-[#CC99FF]",
  12: "bg-[#CCCCFF]",
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

const styles = {
  day: "day size-day flex border-r border-r-black border-b border-b-black justify-center items-center relative",
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
      <p className={cn(count > 100 ? "text-xs" : "text-sm", text)}>{count}</p>
    </MarkCircle>
  );
};

const Day: FC<DayProps> = memo((props) => {
  const { month, day, onDayClick } = props;
  const { year } = useFilters();
  const { groups } = useData();
  const date: DateKeyParams = { day, month, year };
  const key = getDateKey(date);
  const platinums = groups ? groups[key] : null;
  const hasPlatinums = !!platinums && platinums.length > 0;
  const isTouchDevice = useMediaQuery("(pointer: coarse)");

  if (!hasPlatinums) {
    return (
      <div className={styles.day}>
        <p>{day}</p>
      </div>
    );
  }

  if (isTouchDevice) {
    return (
      <Button
        unstyled
        className={styles.day}
        onClick={() => onDayClick({ date, platinums })}>
        <Mark count={platinums.length} />
      </Button>
    );
  }

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger
        className={styles.day}
        onClick={() => onDayClick({ date, platinums })}>
        <Mark count={platinums.length} />
      </TooltipTrigger>
      <TooltipContent>
        <p>{getDateLabel({ date })}</p>
      </TooltipContent>
    </Tooltip>
  );
});

const Total: FC<TotalProps> = memo((props) => {
  const { month, days } = props;
  const { year } = useFilters();
  const { groups } = useData();
  const key = getDateKey({ month, year });
  const total = groups ? groups[key] : null;
  const cols = 35 - days;
  return (
    <div
      className={cn(
        columns[cols],
        "flex justify-center items-center border-r border-r-black border-b border-b-black",
      )}>
      {total && total.length > 0 && <p>{pluralize(total.length, "plat")}</p>}
    </div>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, onDayClick } = props;
  const count = monthLength[month];
  const days = createArray(count);
  return (
    <div className="month w-fit flex flex-col border-l border-l-black border-t border-t-black">
      <div
        className={cn(
          "header h-day flex items-center justify-center border-r border-r-black border-b border-b-black",
          headerColors[month],
        )}>
        <p className="font-semibold text-sm">{monthLabels[month].long}</p>
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
    <div className="relative ml-0 lg:ml-4 @save:ml-4 mb-4 lg:mb-0 @save:mb-0 self-center lg:self-start @save:self-start flex flex-row lg:flex-col @save:flex-col gap-1 -order-1 lg:order-2 @save:order-2">
      {colors.map(([value, color]) => (
        <div
          key={value}
          className="flex flex-col lg:flex-row @save:flex-row justify-center lg:justify-normal @save:justify-normal items-center">
          <MarkCircle color={color[0]} />
          <p className="ml-0 lg:ml-3 @save:ml-3">{value}</p>
        </div>
      ))}
    </div>
  );
};

const OGCalendar: FC<CalendarProps> = (props) => {
  const { onDayClick } = props;
  return (
    <div className="flex flex-1 items-center">
      <div className="flex flex-col lg:flex-row @save:flex-row">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 @save:grid-cols-4 gap-4 justify-items-center order-1">
          {monthIndex.map((month) => (
            <Month key={month} month={month} onDayClick={onDayClick} />
          ))}
        </div>
        <Legend />
      </div>
    </div>
  );
};

export default OGCalendar;
