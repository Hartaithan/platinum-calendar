"use client";

import type { FC, PropsWithChildren } from "react";
import type { Theme } from "@/models/app";
import { ThemeProvider } from "next-themes";
import DataProvider from "@/providers/data";
import FiltersProvider from "@/providers/filters";
import SettingsProvider from "@/providers/settings";
import { TooltipProvider } from "@/components/ui/tooltip";
import { themes } from "@/constants/app";

interface Props extends PropsWithChildren {
  defaultTheme: Theme;
}

const RootProviders: FC<Props> = (props) => {
  const { defaultTheme, children } = props;
  return (
    <ThemeProvider defaultTheme={defaultTheme} themes={themes}>
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
