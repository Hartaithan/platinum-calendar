"use client";

import {
  completesKey,
  groupsKey,
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
  groups: NullableGroupedPlatinumsKeys;
  setGroups: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>;
  completes: NullableGroupedPlatinumsKeys;
  setCompletes: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>;
  platinums: NullableGroupedPlatinums;
  setPlatinums: Dispatch<SetStateAction<NullableGroupedPlatinums>>;
}

const initialValue: Context = {
  status: "idle",
  setStatus: () => null,
  profile: null,
  setProfile: () => null,
  groups: null,
  setGroups: () => null,
  completes: null,
  setCompletes: () => null,
  platinums: null,
  setPlatinums: () => null,
};

const Context = createContext<Context>(initialValue);

const DataProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [status, setStatus] = useState<Context["status"]>(initialValue.status);
  const [profile, setProfile] = useLocalStorage<Context["profile"]>({
    key: profileKey,
    defaultValue: initialValue.profile,
  });
  const [groups, setGroups] = useLocalStorage<Context["groups"]>({
    key: groupsKey,
    defaultValue: initialValue.groups,
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
      groups,
      setGroups,
      platinums,
      setPlatinums,
      completes,
      setCompletes,
    }),
    [
      status,
      profile,
      setProfile,
      groups,
      setGroups,
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
