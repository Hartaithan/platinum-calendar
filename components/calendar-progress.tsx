"use client";

import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { useSettings } from "@/providers/settings";
import { toFixed } from "@/utils/number";
import { memo, useEffect, useState, type FC } from "react";

const defaultProgress = { count: 0, value: 0, left: 0 };

const CalendarProgress: FC = memo(() => {
  const { year } = useFilters();
  const { platinums } = useData();
  const { settings } = useSettings();
  const [progress, setProgress] = useState(defaultProgress);
  const total = settings.leap ? 366 : 365;

  useEffect(() => {
    const count = document.getElementsByClassName("completed-day")?.length || 0;
    const value = (count * 100) / total;
    const left = total - count;
    setProgress({ count, value, left });
  }, [platinums, year, total]);

  return (
    <div className="ml-[none] lg:ml-4 @save:ml-4 flex flex-col justify-center items-center lg:items-start @save:items-start">
      <h1 className="font-medium leading-[normal]">
        Completion{year && ` ${year}`}
      </h1>
      <div className="flex gap-x-2 items-center">
        <p className="font-medium leading-[normal]">
          {toFixed(progress.value)}%
        </p>
        <p className="leading-[normal] text-sm">
          {progress.count}/{total} days
        </p>
      </div>
    </div>
  );
});

export default CalendarProgress;
