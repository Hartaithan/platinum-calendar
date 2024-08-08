"use client";

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
    <div className="flex items-center">
      <button onClick={handlePreviousYear} className="rounded">
        &larr;
      </button>
      <div
        onClick={handleReset}
        className="w-16 text-center text-sm leading-[normal] cursor-pointer">
        {year ?? "All"}
      </div>
      <button onClick={handleNextYear} className="rounded">
        &rarr;
      </button>
    </div>
  );
};

export default YearFilter;
