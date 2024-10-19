"use client";

import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react";
import { useFilters } from "@/providers/filters";
import type { FC } from "react";
import { Button } from "@/components/ui/button";

const YearFilter: FC = () => {
  const { year, setYear, handleYear } = useFilters();
  return (
    <div
      id="year-filter"
      className="flex items-center justify-center relative h-full min-w-full md:min-w-[auto] rounded-md py-2 px-3 border border-input bg-secondary">
      <Button
        unstyled
        className="rounded"
        aria-label="Previous year"
        onClick={() => handleYear("prev")}>
        <ArrowLeftIcon className="size-4" />
      </Button>
      <p className="w-16 text-center text-sm leading-[normal] cursor-default">
        {year ?? "All"}
      </p>
      <Button
        unstyled
        className="rounded"
        aria-label="Next year"
        onClick={() => handleYear("next")}>
        <ArrowRightIcon className="size-4" />
      </Button>
      {year !== null && (
        <Button
          unstyled
          aria-label="Reset year filter"
          className="absolute bg-secondary border border-input size-5 rounded-full -top-2 -right-2 flex justify-center items-center"
          onClick={() => setYear(null)}>
          <XIcon className="size-3" />
        </Button>
      )}
    </div>
  );
};

export default YearFilter;
