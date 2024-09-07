"use client";

import IconArrow from "@/icons/arrow";
import IconClose from "@/icons/close";
import { useFilters } from "@/providers/filters";
import type { FC } from "react";

const YearFilter: FC = () => {
  const { year, setYear, handleYear } = useFilters();
  return (
    <div className="flex items-center relative h-full rounded-md py-2 px-3 border border-input bg-surface">
      <button onClick={() => handleYear("prev")} className="rounded">
        <IconArrow className="size-3 rotate-180" />
      </button>
      <p className="w-16 text-center text-sm leading-[normal] cursor-default">
        {year ?? "All"}
      </p>
      <button onClick={() => handleYear("next")} className="rounded">
        <IconArrow className="size-3" />
      </button>
      {year !== null && (
        <button
          className="absolute bg-surface border border-input/90 size-5 rounded-full -top-2 -right-2 flex justify-center items-center"
          onClick={() => setYear(null)}>
          <IconClose className="size-3" />
        </button>
      )}
    </div>
  );
};

export default YearFilter;
