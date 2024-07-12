"use client";

import type { Dispatch, FC, PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

interface DataContext {
  data: unknown;
  setData: Dispatch<unknown>;
}

const initialValue: DataContext = {
  data: null,
  setData: () => null,
};

const Context = createContext<DataContext>(initialValue);

const DataProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [data, setData] = useState<DataContext["data"]>(null);

  const exposed: DataContext = useMemo(() => ({ data, setData }), [data]);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): DataContext => useContext(Context);

export default DataProvider;
