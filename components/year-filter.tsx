"use client";

import IconArrow from "@/icons/arrow";
import IconClose from "@/icons/close";
import { useFilters } from "@/providers/filters";
import { useCallback, type FC } from "react";

const YearFilter: FC = () => {
  const { year, setYear } = useFilters();

  const handlePreviousYear = useCallback(() => {
    setYear((prev) => {
      if (prev === null) return new Date().getFullYear();
      return prev - 1;
    });
  }, [setYear]);

  const handleNextYear = useCallback(() => {
    setYear((prev) => {
      if (prev === null) return new Date().getFullYear();
      return prev + 1;
    });
  }, [setYear]);

  const handleReset = useCallback(() => {
    setYear(null);
  }, [setYear]);

  return (
    <div className="flex items-center relative h-full rounded-md py-2 px-3 border border-border bg-surface">
      <button onClick={handlePreviousYear} className="rounded">
        <IconArrow className="size-3 rotate-180" />
      </button>
      <p className="w-16 text-center text-sm leading-[normal] cursor-default">
        {year ?? "All"}
      </p>
      <button onClick={handleNextYear} className="rounded">
        <IconArrow className="size-3" />
      </button>
      {year !== null && (
        <button
          className="absolute bg-surface border border-border/90 size-5 rounded-full -top-2 -right-2 flex justify-center items-center"
          onClick={handleReset}>
          <IconClose className="size-3" />
        </button>
      )}
    </div>
  );
};

export default YearFilter;
