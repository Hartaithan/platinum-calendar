"use client";

import IconArrow from "@/icons/arrow";
import { X } from "lucide-react";
import { useFilters } from "@/providers/filters";
import type { FC } from "react";
import { Button } from "@/components/ui/button";

const YearFilter: FC = () => {
  const { year, setYear, handleYear } = useFilters();
  return (
    <div className="flex items-center relative h-full rounded-md py-2 px-3 border border-input bg-primary">
      <Button
        variant="unstyled"
        className="rounded"
        onClick={() => handleYear("prev")}>
        <IconArrow className="size-3 rotate-180" />
      </Button>
      <p className="w-16 text-center text-sm leading-[normal] cursor-default">
        {year ?? "All"}
      </p>
      <Button
        variant="unstyled"
        className="rounded"
        onClick={() => handleYear("next")}>
        <IconArrow className="size-3" />
      </Button>
      {year !== null && (
        <Button
          variant="unstyled"
          className="absolute bg-primary border border-input/90 size-5 rounded-full -top-2 -right-2 flex justify-center items-center"
          onClick={() => setYear(null)}>
          <X className="size-3" />
        </Button>
      )}
    </div>
  );
};

export default YearFilter;
