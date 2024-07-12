"use client";

import type { FC, PropsWithChildren } from "react";
import DataProvider from "@/providers/DataProvider";

const AppProviders: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <DataProvider>{children}</DataProvider>;
};

export default AppProviders;
