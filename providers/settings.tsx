"use client";

import { defaultFetchSource } from "@/constants/fetch";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { FetchSource } from "@/models/fetch";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface Settings {
  source: FetchSource;
  link: boolean;
}

interface Context {
  settings: Settings;
  handleSourceChange: (value: FetchSource) => void;
  handleLinkChange: (value: boolean) => void;
}

const defaultValue: Settings = {
  source: defaultFetchSource,
  link: true,
};

const initialValue: Context = {
  settings: defaultValue,
  handleSourceChange: () => null,
  handleLinkChange: () => null,
};

const merge = (stored: Partial<Settings> | null): Settings => ({
  ...defaultValue,
  ...(stored || {}),
});

const Context = createContext<Context>(initialValue);

const SettingsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Context["settings"]>({
    key: "plat-cal-settings",
    defaultValue,
  });

  const handleSourceChange = useCallback(
    (value: FetchSource) => setSettings((prev) => ({ ...prev, source: value })),
    [setSettings],
  );

  const handleLinkChange = useCallback(
    (value: boolean) => setSettings((prev) => ({ ...prev, link: value })),
    [setSettings],
  );

  const exposed = useMemo<Context>(
    () => ({ settings: merge(settings), handleSourceChange, handleLinkChange }),
    [settings, handleSourceChange, handleLinkChange],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSettings = (): Context => useContext(Context);

export default SettingsProvider;
