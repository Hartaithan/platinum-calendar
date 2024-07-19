import { monthIndex, months } from "@/constants/calendar";
import type { Platinum } from "@/models/trophy";
import { useData } from "@/providers/data";
import { createArray } from "@/utils/array";
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

const Mark: FC<MarkProps> = (props) => {
  const { list } = props;
  if (!list) return null;
  if (list.length === 0) return null;
  return (
    <div className="absolute bg-red-600 size-full rounded-full flex justify-center items-center">
      <p className="text-sm">{list?.length}</p>
    </div>
  );
};

const Day: FC<DayProps> = memo((props) => {
  const { month, day } = props;
  const { platinums } = useData();
  const key = `${day}.${monthIndex[month]}`;
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
