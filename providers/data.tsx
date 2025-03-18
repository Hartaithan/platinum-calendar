"use client";

import {
  completesKey,
  listKey,
  platinumsKey,
  profileKey,
} from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Status } from "@/models/app";
import type {
  NullableGroupedPlatinums,
  NullableGroupedPlatinumsKeys,
} from "@/models/platinum";
import type { NullableProfile } from "@/models/profile";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

interface Context {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  profile: NullableProfile;
  setProfile: Dispatch<SetStateAction<NullableProfile>>;
  list: NullableGroupedPlatinums;
  setList: Dispatch<SetStateAction<NullableGroupedPlatinums>>;
  platinums: NullableGroupedPlatinumsKeys;
  setPlatinums: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>;
  completes: NullableGroupedPlatinumsKeys;
  setCompletes: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>;
}

const initialValue: Context = {
  status: "idle",
  setStatus: () => null,
  profile: null,
  setProfile: () => null,
  list: null,
  setList: () => null,
  platinums: null,
  setPlatinums: () => null,
  completes: null,
  setCompletes: () => null,
};

const Context = createContext<Context>(initialValue);

const DataProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [status, setStatus] = useState<Context["status"]>(initialValue.status);
  const [profile, setProfile] = useLocalStorage<Context["profile"]>({
    key: profileKey,
    defaultValue: initialValue.profile,
  });
  const [list, setList] = useLocalStorage<Context["list"]>({
    key: listKey,
    defaultValue: initialValue.list,
  });
  const [platinums, setPlatinums] = useLocalStorage<Context["platinums"]>({
    key: platinumsKey,
    defaultValue: initialValue.platinums,
  });
  const [completes, setCompletes] = useLocalStorage<Context["completes"]>({
    key: completesKey,
    defaultValue: initialValue.completes,
  });

  const exposed: Context = useMemo(
    () => ({
      status,
      setStatus,
      profile,
      setProfile,
      list,
      setList,
      platinums,
      setPlatinums,
      completes,
      setCompletes,
    }),
    [
      status,
      profile,
      setProfile,
      list,
      setList,
      platinums,
      setPlatinums,
      completes,
      setCompletes,
    ],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): Context => useContext(Context);

export default DataProvider;
