"use client";

import type { Status } from "@/models/app";
import type { NullableProfile } from "@/models/profile";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type {
  NullableGroupedPlatinums,
  NullableGroupedPlatinumsKeys,
} from "@/models/trophy";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

interface Context {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  profile: NullableProfile;
  setProfile: Dispatch<SetStateAction<NullableProfile>>;
  groups: NullableGroupedPlatinumsKeys;
  setGroups: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>;
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
  platinums: null,
  setPlatinums: () => null,
};

const Context = createContext<Context>(initialValue);

const DataProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [status, setStatus] = useState<Context["status"]>(initialValue.status);
  const [profile, setProfile] = useLocalStorage<Context["profile"]>({
    key: "plat-cal-profile",
    defaultValue: initialValue.profile,
  });
  const [groups, setGroups] = useLocalStorage<Context["groups"]>({
    key: "plat-cal-groups",
    defaultValue: initialValue.groups,
  });
  const [platinums, setPlatinums] = useLocalStorage<Context["platinums"]>({
    key: "plat-cal-platinums",
    defaultValue: initialValue.platinums,
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
    }),
    [status, profile, setProfile, groups, setGroups, platinums, setPlatinums],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): Context => useContext(Context);

export default DataProvider;
