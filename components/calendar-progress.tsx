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
  }, [platinums, year, total, settings.leap, settings.completes]);

  return (
    <div className="ml-[none] flex flex-col items-center justify-center @save:ml-4 @save:items-start lg:ml-4 lg:items-start">
      <h1 className="font-medium leading-[normal]">
        Completion{year && ` ${year}`}
      </h1>
      <div className="flex items-center gap-x-2">
        <p className="font-medium leading-[normal]">
          {toFixed(progress.value)}%
        </p>
        <p className="text-sm leading-[normal]">
          {progress.count}/{total} days
        </p>
      </div>
    </div>
  );
});

export default CalendarProgress;
