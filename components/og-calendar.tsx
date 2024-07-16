import { months } from "@/constants/calendar";
import { createArray } from "@/utils/array";
import { memo, type FC } from "react";

interface MonthProps {
  month: string;
  days: number;
}

interface DayProps {
  day: number;
}

const Day: FC<DayProps> = memo((props) => {
  const { day } = props;
  return (
    <div className="day size-8 flex outline outline-1 outline-white justify-center items-center">
      {day}
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
        {days.map((i) => (
          <Day key={`month-${i}`} day={i} />
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
