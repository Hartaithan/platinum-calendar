"use client";

import type { FC, PropsWithChildren } from "react";
import DataProvider from "@/providers/data";

const RootProviders: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <DataProvider>{children}</DataProvider>;
};

export default RootProviders;
