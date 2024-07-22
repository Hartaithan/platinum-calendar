import { monthIndex, months } from "@/constants/calendar";
import type { Platinum } from "@/models/trophy";
import { useData } from "@/providers/data";
import { createArray } from "@/utils/array";
import { getDateKey } from "@/utils/date";
import { memo, type FC } from "react";
import { twMerge } from "tailwind-merge";

interface MonthProps {
  month: string;
  days: number;
}

interface MarkProps {
  list: Platinum[] | null;
}

interface DayProps {
  month: string;
  day: number;
}

interface TotalProps {
  month: string;
  days: number;
}

const colors: Record<number, [string, string]> = {
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

const getColors = (list: Platinum[]): [string, string] => {
  if (list.length === 0) return ["", ""];
  if (list.length > 7) return colors[7];
  return colors[list.length];
};

const Mark: FC<MarkProps> = (props) => {
  const { list } = props;
  if (!list || list.length === 0) return null;
  const [bg, text] = getColors(list);
  return (
    <div
      className={twMerge(
        "absolute border border-white size-11/12 rounded-full flex justify-center items-center",
        bg,
      )}>
      <p className={twMerge("text-sm", text)}>{list?.length}</p>
    </div>
  );
};

const Day: FC<DayProps> = memo((props) => {
  const { month, day } = props;
  const { platinums } = useData();
  const key = getDateKey({ day, month: monthIndex[month] });
  const list = platinums ? platinums[key] : null;
  return (
    <div className="day size-8 flex outline outline-1 outline-white justify-center items-center relative">
      <p>{day}</p>
      <Mark list={list} />
    </div>
  );
});

const Total: FC<TotalProps> = memo((props) => {
  const { month, days } = props;
  const { platinums } = useData();
  const key = getDateKey({ month: monthIndex[month] });
  const total = platinums ? platinums[key] : null;
  if (!total || total.length === 0) return null;
  const cols = 35 - days;
  return (
    <div className={twMerge(columns[cols], "flex justify-center items-center")}>
      <p>{total.length} plats</p>
    </div>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, days: count } = props;
  const days = createArray(count);
  return (
    <div className="month flex flex-col border">
      <div className="header h-8 flex items-center justify-center">
        <p className="font-semibold text-sm">{month}</p>
      </div>
      <div className="grid grid-cols-7 gap-[1px]">
        {days.map((day) => (
          <Day key={`month-${day}`} month={month} day={day} />
        ))}
        <Total days={count} month={month} />
      </div>
    </div>
  );
});

const OGCalendar: FC = memo(() => {
  const entries = Object.entries(months);
  return (
    <div className="grid grid-cols-4 gap-4">
      {entries.map(([month, days]) => (
        <Month key={month} month={month} days={days} />
      ))}
    </div>
  );
});

export default OGCalendar;
