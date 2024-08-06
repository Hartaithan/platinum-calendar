"use client";

import type { YearSetHandler } from "@/models/filters";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface Context {
  year: number | null;
  setYear: Dispatch<SetStateAction<number | null>>;
  handleYear: YearSetHandler;
}

const initialValue: Context = {
  year: null,
  setYear: () => null,
  handleYear: () => null,
};

const Context = createContext<Context>(initialValue);

const FiltersProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [year, setYear] = useState<Context["year"]>(null);

  const handleYear: YearSetHandler = useCallback((dir) => {
    setYear((prev) => {
      const currentYear = new Date().getFullYear();
      const isAll = prev === null;
      if (dir === "next") {
        return isAll ? currentYear : prev + 1;
      } else {
        return isAll ? currentYear : prev - 1;
      }
    });
  }, []);

  const exposed: Context = useMemo(
    () => ({ year, setYear, handleYear }),
    [year, handleYear],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useFilters = (): Context => useContext(Context);

export default FiltersProvider;
