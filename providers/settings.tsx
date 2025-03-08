"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Settings } from "@/models/app";
import posthog from "posthog-js";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface Context {
  settings: Settings;
  handleLinkChange: (value: boolean) => void;
  handleLeapChange: (value: boolean) => void;
  resetSettings: () => void;
}

const defaultValue: Settings = {
  link: true,
  leap: true,
};

const initialValue: Context = {
  settings: defaultValue,
  handleLinkChange: () => null,
  handleLeapChange: () => null,
  resetSettings: () => null,
};

const merge = (stored: Partial<Settings> | null): Settings => ({
  ...defaultValue,
  ...(stored || {}),
});

const Context = createContext<Context>(initialValue);

const SettingsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Context["settings"]>({
    key: "plat-cal-settings-feb-2025",
    defaultValue,
  });

  const handleLinkChange = useCallback(
    (value: boolean) => {
      posthog.capture("settings-link", { value });
      setSettings((prev) => ({ ...prev, link: value }));
    },
    [setSettings],
  );

  const handleLeapChange = useCallback(
    (value: boolean) => {
      posthog.capture("settings-leap", { value });
      setSettings((prev) => ({ ...prev, leap: value }));
    },
    [setSettings],
  );

  const resetSettings = useCallback(() => {
    posthog.capture("settings-reset");
    setSettings(defaultValue);
  }, [setSettings]);

  const exposed = useMemo<Context>(
    () => ({
      settings: merge(settings),
      handleLinkChange,
      handleLeapChange,
      resetSettings,
    }),
    [settings, handleLinkChange, handleLeapChange, resetSettings],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSettings = (): Context => useContext(Context);

export default SettingsProvider;
