"use client";

import type { NullableProfile } from "@/models/profile";
import type { NullablePlatinums, Pagination } from "@/models/trophy";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

interface Context {
  profile: NullableProfile;
  setProfile: Dispatch<SetStateAction<NullableProfile>>;
  platinums: NullablePlatinums;
  setPlatinums: Dispatch<SetStateAction<NullablePlatinums>>;
  pagination: Pagination;
  setPagination: Dispatch<Pagination>;
}

const initialValue: Context = {
  profile: null,
  setProfile: () => null,
  platinums: null,
  setPlatinums: () => null,
  pagination: null,
  setPagination: () => null,
};

const Context = createContext<Context>(initialValue);

const DataProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [profile, setProfile] = useState<Context["profile"]>(null);
  const [platinums, setPlatinums] = useState<Context["platinums"]>(null);
  const [pagination, setPagination] = useState<Context["pagination"]>(null);

  const exposed: Context = useMemo(
    () => ({
      profile,
      setProfile,
      platinums,
      setPlatinums,
      pagination,
      setPagination,
    }),
    [profile, platinums, pagination],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): Context => useContext(Context);

export default DataProvider;
