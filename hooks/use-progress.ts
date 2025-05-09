"use client";

import { dayStatus } from "@/constants/calendar";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { useSettings } from "@/providers/settings";
import { toFixed } from "@/utils/number";
import { useEffect, useState } from "react";

const defaultProgress = {
  completed: 0,
  uncompleted: 0,
  total: 0,
  value: 0,
  label: "0%",
};

export const getProgress = (current: number, total: number) => {
  const progress = (current / total) * 100;
  const notValid = progress < 0 || isNaN(progress) || !isFinite(progress);
  if (notValid) return { value: 0, label: "0%" };
  return { value: progress, label: `${toFixed(progress)}%` };
};

const getCount = (className: string) =>
  document.getElementsByClassName(className)?.length || 0;

export const useProgress = () => {
  const { year } = useFilters();
  const { platinums } = useData();
  const { settings } = useSettings();
  const [progress, setProgress] = useState(defaultProgress);

  useEffect(() => {
    const completed = getCount(dayStatus.completed);
    const uncompleted = getCount(dayStatus.uncompleted);
    const total = completed + uncompleted;
    const { value, label } = getProgress(completed, total);
    setProgress({ completed, uncompleted, total, value, label });
  }, [platinums, year, settings.leap, settings.data]);

  return progress;
};
