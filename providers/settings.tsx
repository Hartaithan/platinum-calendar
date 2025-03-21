"use client";

import { settingsKey } from "@/constants/storage";
import {
  readLocalStorageValue,
  useLocalStorage,
} from "@/hooks/use-local-storage";
import type { Settings } from "@/models/app";
import { debounce } from "@/utils/async";
import type { Properties } from "posthog-js";
import posthog from "posthog-js";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface Context {
  settings: Settings;
  handleLeapChange: (value: boolean) => void;
  handleCompletesChange: (value: boolean) => void;
  resetSettings: () => void;
}

const defaultValue: Settings = {
  leap: true,
  completes: false,
};

const initialValue: Context = {
  settings: defaultValue,
  handleLeapChange: () => null,
  handleCompletesChange: () => null,
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

const debouncedCapture = debounce((key: string, value?: string | boolean) => {
  let payload: Properties | null = null;
  if (value) payload = { value };
  posthog.capture(key, payload);
}, 1500);

updateSettings();

const SettingsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Context["settings"]>({
    key: settingsKey,
    defaultValue,
  });

  const handleLeapChange = useCallback(
    (value: boolean) => {
      debouncedCapture("settings-leap", value);
      setSettings((prev) => ({ ...prev, leap: value }));
    },
    [setSettings],
  );

  const handleCompletesChange = useCallback(
    (value: boolean) => {
      debouncedCapture("settings-completes", value);
      setSettings((prev) => ({ ...prev, completes: value }));
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
      handleCompletesChange,
      resetSettings,
    }),
    [settings, handleLeapChange, handleCompletesChange, resetSettings],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSettings = (): Context => useContext(Context);

export default SettingsProvider;
