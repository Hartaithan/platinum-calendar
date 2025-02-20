"use client";

import { Button } from "@/components/ui/button";
import { useFilters } from "@/providers/filters";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react";
import type { FC } from "react";

const YearFilter: FC = () => {
  const { year, setYear, handleYear } = useFilters();
  return (
    <div
      id="year-filter"
      className="relative flex h-full min-w-full items-center justify-center rounded-md border border-input bg-secondary px-3 py-2 md:min-w-[auto]">
      <Button
        unstyled
        className="rounded"
        aria-label="Previous year"
        onClick={() => handleYear("prev")}>
        <ArrowLeftIcon className="size-4" />
      </Button>
      <p className="w-16 cursor-default text-center text-sm leading-[normal]">
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
          className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border border-input bg-secondary"
          onClick={() => setYear(null)}>
          <XIcon className="size-3" />
        </Button>
      )}
    </div>
  );
};

export default YearFilter;
