"use client";

import { settingsKey } from "@/constants/storage";
import {
  readLocalStorageValue,
  useLocalStorage,
} from "@/hooks/use-local-storage";
import type { Settings } from "@/models/app";
import { debouncedCapture } from "@/utils/analytics";
import posthog from "posthog-js";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface Context {
  settings: Settings;
  handleLeapChange: (value: Settings["leap"]) => void;
  handleDataChange: (value: Settings["data"]) => void;
  handleHideChange: (value: Settings["hide"]) => void;
  resetSettings: () => void;
}

const defaultValue: Settings = {
  leap: true,
  data: "platinums",
  hide: false,
};

const initialValue: Context = {
  settings: defaultValue,
  handleLeapChange: () => null,
  handleDataChange: () => null,
  handleHideChange: () => null,
  resetSettings: () => null,
};

const merge = (stored: Partial<Settings> | null): Settings => ({
  ...defaultValue,
  ...(stored || {}),
});

const Context = createContext<Context>(initialValue);

const updateSettings = () => {
  if (typeof window === "undefined") return;
  const value = readLocalStorageValue({ key: settingsKey, defaultValue });
  const merged = merge(value);
  localStorage.setItem(settingsKey, JSON.stringify(merged));
};

updateSettings();

const SettingsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Context["settings"]>({
    key: settingsKey,
    defaultValue,
  });

  const handleLeapChange: Context["handleLeapChange"] = useCallback(
    (value) => {
      debouncedCapture("settings-leap", { value });
      setSettings((prev) => ({ ...prev, leap: value }));
    },
    [setSettings],
  );

  const handleDataChange: Context["handleDataChange"] = useCallback(
    (value) => {
      debouncedCapture("settings-data", { value });
      setSettings((prev) => ({ ...prev, data: value }));
    },
    [setSettings],
  );

  const handleHideChange: Context["handleHideChange"] = useCallback(
    (value) => {
      debouncedCapture("settings-hide", { value });
      setSettings((prev) => ({ ...prev, hide: value }));
    },
    [setSettings],
  );

  const resetSettings = useCallback(() => {
    posthog.capture("settings-reset");
    setSettings(defaultValue);
  }, [setSettings]);

  const exposed = useMemo<Context>(
    () => ({
      settings,
      handleLeapChange,
      handleDataChange,
      handleHideChange,
      resetSettings,
    }),
    [
      settings,
      handleLeapChange,
      handleDataChange,
      handleHideChange,
      resetSettings,
    ],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSettings = (): Context => useContext(Context);

export default SettingsProvider;
