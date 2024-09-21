"use client";

import type { FC, PropsWithChildren } from "react";
import type { Theme } from "@/models/app";
import DataProvider from "@/providers/data";
import ThemeProvider from "@/providers/theme";
import FiltersProvider from "@/providers/filters";
import SettingsProvider from "@/providers/settings";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props extends PropsWithChildren {
  defaultTheme: Theme;
}

const RootProviders: FC<Props> = (props) => {
  const { defaultTheme, children } = props;
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <TooltipProvider>
        <DataProvider>
          <FiltersProvider>
            <SettingsProvider>{children}</SettingsProvider>
          </FiltersProvider>
        </DataProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default RootProviders;
