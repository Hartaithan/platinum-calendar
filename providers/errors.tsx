"use client";

import ErrorList from "@/components/error-list";
import type { FC, PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface Context {
  addError: (error: string) => void;
  removeError: (index: number) => void;
}

const initialValue: Context = {
  addError: () => null,
  removeError: () => null,
};

const Context = createContext<Context>(initialValue);

const ErrorsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [errors, setErrors] = useState<string[]>([]);

  const addError = useCallback((error: string) => {
    setErrors((p) => {
      const prev = [...p];
      prev.push(error);
      return prev;
    });
  }, []);

  const removeError = useCallback((index: number) => {
    setErrors((p) => {
      const prev = [...p];
      prev.splice(index, 1);
      return prev;
    });
  }, []);

  const exposed: Context = useMemo(
    () => ({ addError, removeError }),
    [addError, removeError],
  );

  return (
    <Context.Provider value={exposed}>
      {children}
      <ErrorList errors={errors} />
    </Context.Provider>
  );
};

export const useErrors = (): Context => useContext(Context);

export default ErrorsProvider;
