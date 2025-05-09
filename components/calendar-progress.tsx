"use client";

import { useProgress } from "@/hooks/use-progress";
import { useFilters } from "@/providers/filters";
import { memo, type FC } from "react";

const CalendarProgress: FC = memo(() => {
  const { year } = useFilters();
  const { label, completed, total } = useProgress();

  return (
    <div className="ml-[none] flex flex-col items-center justify-center @save:!ml-4 @save:!items-start lg:ml-4 lg:items-start">
      <h1 className="font-medium leading-[normal]">
        Completion{year && ` ${year}`}
      </h1>
      <div className="flex items-center gap-x-2">
        <p className="font-medium leading-[normal]">{label}</p>
        <p className="text-sm leading-[normal]">
          {completed}/{total} days
        </p>
      </div>
    </div>
  );
});

export default CalendarProgress;
