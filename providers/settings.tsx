"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { FetchTarget } from "@/models/fetch";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface Settings {
  target: FetchTarget;
}

interface Context {
  settings: Settings;
  handleTargetChange: (value: FetchTarget) => void;
}

const defaultValue: Settings = {
  target: "alpha",
};

const initialValue: Context = {
  settings: defaultValue,
  handleTargetChange: () => null,
};

const Context = createContext<Context>(initialValue);

const SettingsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Context["settings"]>({
    key: "plat-cal-settings",
    defaultValue,
  });

  const handleTargetChange = useCallback(
    (value: FetchTarget) => {
      setSettings((prev) => ({ ...prev, target: value }));
    },
    [setSettings],
  );

  const exposed: Context = useMemo(
    () => ({ settings, handleTargetChange }),
    [settings, handleTargetChange],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSettings = (): Context => useContext(Context);

export default SettingsProvider;
