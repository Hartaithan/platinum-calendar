"use client";

import { setTheme as setThemeAction } from "@/actions/theme";
import type { Theme } from "@/models/app";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface Props extends PropsWithChildren {
  defaultTheme?: Theme;
}

interface Context {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  changeTheme: (value: Theme) => void;
}

const initialValue: Context = {
  theme: "og",
  setTheme: () => null,
  changeTheme: () => null,
};

const Context = createContext<Context>(initialValue);

const ThemeProvider: FC<Props> = (props) => {
  const { defaultTheme = "og", children } = props;
  const [theme, setTheme] = useState<Context["theme"]>(defaultTheme);

  const changeTheme: Context["changeTheme"] = useCallback((value) => {
    setTheme(value);
    const html = document.documentElement;
    if (html) html.setAttribute("data-theme", value);
    try {
      setThemeAction(value);
    } catch (err) {
      console.error("unable to set theme in cookie", err);
    }
  }, []);

  const exposed: Context = useMemo(
    () => ({
      theme,
      setTheme,
      changeTheme,
    }),
    [theme, changeTheme],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useTheme = (): Context => useContext(Context);

export default ThemeProvider;
