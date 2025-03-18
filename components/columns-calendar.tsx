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

const colors = [
  "border-dashed text-gray-400",
  "border-black/50 bg-yellow-100 text-black/70",
  "border-black/50 bg-yellow-200 text-black/70",
  "border-black/50 bg-yellow-300 text-black/70",
  "border-black/50 bg-yellow-400 text-black/70",
  "border-black/50 bg-yellow-500 text-black/70",
  "border-black/50 bg-orange-400 text-white",
  "border-black/50 bg-orange-500 text-white",
  "border-black/50 bg-red-500 text-white",
  "border-black/50 bg-red-600 text-white",
];

const styles = {
  day: "day w-full h-6 flex items-center justify-between text-xs border border-black overflow-hidden",
  completed: "completed-day",
  content: "ml-1 text-4xl font-bold",
  month: "flex flex-col justify-center w-full h-6 border border-black",
  monthContent: "ml-2 text-xs font-semibold",
  key: "key flex items-center justify-center size-6 text-xs border border-black bg-white",
};

const monthKeys = Array.from({ length: 31 }, (_, i) => i + 1);

const getColor = (count: number) => {
  if (count > 9) return colors.at(-1);
  const color = colors[count];
  if (!color) return colors[0];
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
    getColor(count),
    hasItems && styles.completed,
  );

  const content = <p className={styles.content}>{count}</p>;

  if (isDayVisible) return null;

  if (!hasItems) return <div className={dayStyles} />;

  if (isTouchDevice) {
    return (
      <Button
        unstyled
        aria-label={ariaLabel}
        className={dayStyles}
        onClick={() => onDayClick({ date, items })}>
        {content}
      </Button>
    );
  }

  return (
    <DayTooltip label={label}>
      <TooltipTrigger
        aria-label={ariaLabel}
        className={dayStyles}
        onClick={() => onDayClick({ date, items })}>
        {content}
      </TooltipTrigger>
    </DayTooltip>
  );
});

const MonthHeader: FC<BaseMonthProps> = memo((props) => {
  const { month } = props;
  return (
    <div className={cn(styles.month, "mb-1")}>
      <h3 className={styles.monthContent}>{monthLabels[month].long}</h3>
    </div>
  );
});

const MonthFooter: FC<BaseMonthProps> = memo((props) => {
  const { month } = props;
  const { platinums } = useData();
  const { year } = useFilters();
  const key = getDateKey({ month, year });
  const total = platinums ? platinums[key] : null;
  return (
    <div className={cn(styles.month, "mt-1")}>
      <p className={styles.monthContent}>
        {total && total.length > 0
          ? pluralize(total.length, "plat")
          : "no plats :("}
      </p>
    </div>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, onDayClick } = props;
  const count = monthLength[month];
  const days = createArray(count);
  return (
    <div className="flex w-20 min-w-20 flex-col justify-self-center">
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
      <MonthFooter month={month} />
    </div>
  );
});

const MonthKeys: FC = memo(() => {
  return (
    <div className="sticky left-0 flex flex-col justify-self-center">
      <div className="flex flex-1 flex-col justify-end gap-1">
        {monthKeys.map((index) => (
          <div key={`month-key-${index}`} className={styles.key}>
            <p>{index}</p>
          </div>
        ))}
        <div className={cn(styles.key, "opacity-0")} />
      </div>
    </div>
  );
});

const ColumnsCalendar: FC = () => {
  const { handleDayClick, modal } = useDateDetailsModal();
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex w-[80vw] gap-1 overflow-x-auto @save:w-auto lg:w-auto">
        <MonthKeys />
        {monthIndex.map((month) => (
          <Month key={month} month={month} onDayClick={handleDayClick} />
        ))}
      </div>
      {modal}
    </div>
  );
};

export default ColumnsCalendar;
