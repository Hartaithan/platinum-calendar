"use client";

import type { FC, PropsWithChildren } from "react";
import DataProvider from "@/providers/data";
import ThemeProvider from "@/providers/theme";
import type { Theme } from "@/models/app";

interface Props extends PropsWithChildren {
  defaultTheme: Theme;
}

const RootProviders: FC<Props> = (props) => {
  const { defaultTheme, children } = props;
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <DataProvider>{children}</DataProvider>
    </ThemeProvider>
  );
};

export default RootProviders;
