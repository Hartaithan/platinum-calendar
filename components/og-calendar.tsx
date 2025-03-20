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
import { useSettings } from "@/providers/settings";
import { createArray } from "@/utils/array";
import { checkLeapDay } from "@/utils/calendar";
import { getDateKey } from "@/utils/date";
import { pluralize } from "@/utils/string";
import { cn } from "@/utils/styles";
import type { ComponentPropsWithRef } from "react";
import { forwardRef, memo, type FC } from "react";

interface MarkProps {
  count: number;
}

interface MarkCircleProps extends ComponentPropsWithRef<"div"> {
  color: string;
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
        "absolute inset-0 m-auto flex items-center justify-center",
        count > 100 ? "text-xs" : "text-sm",
        text,
        bg,
      )}>
      {count}
    </MarkCircle>
  );
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
  const dayStyles = cn(styles.day, hasItems && "completed-day");

  if (isDayVisible) return null;

  if (!hasItems) return <div className={dayStyles}>{day}</div>;

  if (isTouchDevice) {
    return (
      <Button
        unstyled
        aria-label={ariaLabel}
        className={dayStyles}
        onClick={() => onDayClick({ date, items })}>
        <Mark count={count} />
      </Button>
    );
  }

  return (
    <DayTooltip label={label}>
      <TooltipTrigger
        aria-label={ariaLabel}
        className={dayStyles}
        onClick={() => onDayClick({ date, items })}>
        <Mark count={count} />
      </TooltipTrigger>
    </DayTooltip>
  );
});

const Total: FC<TotalProps> = memo((props) => {
  const { month, days } = props;
  const { year } = useFilters();
  const { platinums } = useData();
  const { settings } = useSettings();
  const key = getDateKey({ month, year });
  const { isTotalVisible } = checkLeapDay({ month, settings });
  const total = platinums ? platinums[key] : null;
  const cols = 35 - days;
  return (
    <div
      className={cn(
        columns[isTotalVisible ? cols + 1 : cols],
        "h-day flex items-center justify-center border-b border-r border-b-black border-r-black",
      )}>
      {total && total.length > 0 && pluralize(total.length, "plat")}
    </div>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, onDayClick } = props;
  const count = monthLength[month];
  const days = createArray(count);
  return (
    <div className="month flex w-fit flex-col border-l border-t border-l-black border-t-black">
      <div
        className={cn(
          "header h-day flex items-center justify-center border-b border-r border-b-black border-r-black text-sm font-semibold",
          headerColors[month],
        )}>
        {monthLabels[month].long}
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
    <div className="relative -order-1 mb-4 ml-0 flex flex-row gap-1 self-center @save:!order-2 @save:!mb-0 @save:!ml-4 @save:!flex-col @save:!self-start lg:order-2 lg:mb-0 lg:ml-4 lg:flex-col lg:self-start">
      {colors.map(([value, color]) => (
        <div
          key={value}
          className="flex flex-col items-center justify-center @save:!flex-row @save:!justify-normal lg:flex-row lg:justify-normal">
          <MarkCircle color={color[0]} />
          <p className="ml-0 @save:!ml-3 lg:ml-3">
            {value}
            {value === "7" && "+"}
          </p>
        </div>
      ))}
    </div>
  );
};

const OGCalendar: FC = () => {
  const { handleDayClick, modal } = useDateDetailsModal();
  return (
    <div className="flex flex-1 items-center">
      <div className="flex flex-col @save:!flex-row lg:flex-row">
        <div className="relative order-1 grid grid-cols-1 justify-items-center gap-4 @save:!grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {monthIndex.map((month) => (
            <Month key={month} month={month} onDayClick={handleDayClick} />
          ))}
        </div>
        <Legend />
      </div>
      {modal}
    </div>
  );
};

export default OGCalendar;
