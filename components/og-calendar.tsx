import { monthIndex, months } from "@/constants/calendar";
import type { Platinum } from "@/models/trophy";
import { useData } from "@/providers/data";
import { createArray } from "@/utils/array";
import { getDateKey } from "@/utils/date";
import { memo, type FC } from "react";

interface MonthProps {
  month: string;
  days: number;
}

interface DayProps {
  month: string;
  day: number;
}

interface MarkProps {
  list: Platinum[] | null;
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
      className={`absolute ${bg} border border-white size-11/12 rounded-full flex justify-center items-center`}>
      <p className={`text-sm ${text}`}>{list?.length}</p>
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
      {day}
      <Mark list={list} />
    </div>
  );
});

const Month: FC<MonthProps> = memo((props) => {
  const { month, days: count } = props;
  const days = createArray(count);
  return (
    <div className="month flex flex-col border">
      <div className="header h-8 flex items-center justify-center font-semibold text-sm">
        {month}
      </div>
      <div className="grid grid-cols-7 gap-[1px]">
        {days.map((day) => (
          <Day key={`month-${day}`} month={month} day={day} />
        ))}
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
