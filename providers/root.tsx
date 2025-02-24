"use client";

import type { Theme } from "@/models/app";
import AnalyticsProvider from "@/providers/analytics";
import CaptureProvider from "@/providers/capture";
import DataProvider from "@/providers/data";
import FiltersProvider from "@/providers/filters";
import SettingsProvider from "@/providers/settings";
import ThemeProvider from "@/providers/theme";
import type { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  defaultTheme: Theme;
}

const RootProviders: FC<Props> = (props) => {
  const { defaultTheme, children } = props;
  return (
    <AnalyticsProvider>
      <ThemeProvider defaultValue={defaultTheme}>
        <DataProvider>
          <FiltersProvider>
            <SettingsProvider>
              <CaptureProvider>{children}</CaptureProvider>
            </SettingsProvider>
          </FiltersProvider>
        </DataProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  );
};

export default RootProviders;
