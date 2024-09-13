"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { FetchSource } from "@/models/fetch";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface Settings {
  source: FetchSource;
}

interface Context {
  settings: Settings;
  handleSourceChange: (value: FetchSource) => void;
}

const defaultValue: Settings = {
  source: "alpha",
};

const initialValue: Context = {
  settings: defaultValue,
  handleSourceChange: () => null,
};

const Context = createContext<Context>(initialValue);

const SettingsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Context["settings"]>({
    key: "plat-cal-settings",
    defaultValue,
  });

  const handleSourceChange = useCallback(
    (value: FetchSource) => {
      setSettings((prev) => ({ ...prev, source: value }));
    },
    [setSettings],
  );

  const exposed: Context = useMemo(
    () => ({ settings, handleSourceChange }),
    [settings, handleSourceChange],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSettings = (): Context => useContext(Context);

export default SettingsProvider;
