import { monthIndex, months } from "@/constants/calendar";
import type { CalendarProps, DayClickHandler } from "@/models/calendar";
import type { DateKeyParams } from "@/models/date";
import { useData } from "@/providers/data";
import { createArray } from "@/utils/array";
import { getDateKey } from "@/utils/date";
import type { ComponentPropsWithoutRef } from "react";
import { memo, type FC } from "react";
import { twMerge } from "tailwind-merge";

interface MonthProps {
  month: string;
  days: number;
  onDayClick: DayClickHandler;
}

interface MarkProps {
  count: number;
}

interface MarkCircleProps extends ComponentPropsWithoutRef<"div"> {
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

const MarkCircle: FC<MarkCircleProps> = (props) => {
  const { color, className, children } = props;
  return (
    <div
      className={twMerge(
        "size-7 rounded-full border border-black",
        className,
        color,
      )}>
      {children}
    </div>
  );
};

const Mark: FC<MarkProps> = (props) => {
  const { count } = props;
  if (count <= 0) return null;
  const [bg, text] = getColors(count);
  return (
    <MarkCircle
      color={bg}
      className={twMerge("absolute flex justify-center items-center", bg)}>
      <p className={twMerge("text-sm", text)}>{count}</p>
    </MarkCircle>
  );
};

const Day: FC<DayProps> = memo((props) => {
  const { month, day, onDayClick } = props;
  const { groups } = useData();
  const date: DateKeyParams = { day, month: monthIndex[month] };
  const key = getDateKey(date);
  const platinums = groups ? groups[key] : null;
  return (
    <button
      className="day size-8 flex outline outline-1 outline-black justify-center items-center relative"
      onClick={() => onDayClick({ date, platinums })}>
      <p>{day}</p>
      <Mark count={platinums?.length || 0} />
    </button>
  );
});

const Total: FC<TotalProps> = memo((props) => {
  const { month, days } = props;
  const { groups } = useData();
  const key = getDateKey({ month: monthIndex[month] });
  const total = groups ? groups[key] : null;
  if (!total || total.length === 0) return null;
  const cols = 35 - days;
  return (
    <div className={twMerge(columns[cols], "flex justify-center items-center")}>
      <p>{total.length} plats</p>
    </div>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, days: count, onDayClick } = props;
  const days = createArray(count);
  return (
    <div className="month flex flex-col border border-black">
      <div
        className={twMerge(
          "header h-8 flex items-center justify-center",
          headerColors[month],
        )}>
        <p className="font-semibold text-sm">{month}</p>
      </div>
      <div className="grid grid-cols-7 gap-[1px]">
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
    <div className="absolute inset-y-0 -right-48 w-44 flex flex-col gap-1">
      {colors.map(([value, color]) => (
        <div key={value} className="flex items-center">
          <MarkCircle color={color[0]} />
          <p className="ml-3">{value}</p>
        </div>
      ))}
    </div>
  );
};

const OGCalendar: FC<CalendarProps> = (props) => {
  const { onDayClick } = props;
  const entries = Object.entries(months);
  return (
    <div className="relative grid grid-cols-4 gap-4">
      {entries.map(([month, days]) => (
        <Month key={month} month={month} days={days} onDayClick={onDayClick} />
      ))}
      <Legend />
    </div>
  );
};

export default OGCalendar;
