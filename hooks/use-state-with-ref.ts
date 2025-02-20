import type { Dispatch, SetStateAction } from "react";
import { useCallback, useRef, useState } from "react";

const isFunction = <S>(
  setStateAction: SetStateAction<S>,
): setStateAction is (prevState: S) => S =>
  typeof setStateAction === "function";

interface ReadOnlyRefObject<T> {
  readonly current: T;
}

interface UseStateRef {
  <S>(
    initialState: S | (() => S),
  ): [S, ReadOnlyRefObject<S>, Dispatch<SetStateAction<S>>];
  <S = undefined>(): [
    S | undefined,
    ReadOnlyRefObject<S | undefined>,
    Dispatch<SetStateAction<S | undefined>>,
  ];
}

export const useStateWithRef: UseStateRef = <S>(
  initialState?: S | (() => S),
) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(state);

  const dispatch: typeof setState = useCallback((setStateAction: any) => {
    ref.current = isFunction(setStateAction)
      ? setStateAction(ref.current)
      : setStateAction;

    setState(ref.current);
  }, []);

  return [state, ref, dispatch];
};
