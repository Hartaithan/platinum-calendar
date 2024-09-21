"use client";

import type { FC, PropsWithChildren } from "react";
import type { Theme } from "@/models/app";
import DataProvider from "@/providers/data";
import ThemeProvider from "@/providers/theme";
import FiltersProvider from "@/providers/filters";
import SettingsProvider from "@/providers/settings";

interface Props extends PropsWithChildren {
  defaultTheme: Theme;
}

const RootProviders: FC<Props> = (props) => {
  const { defaultTheme, children } = props;
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <DataProvider>
        <FiltersProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </FiltersProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default RootProviders;
