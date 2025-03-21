"use client";

import {
  collectionKey,
  completesKey,
  gamesKey,
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

export interface DataContext {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  profile: NullableProfile;
  setProfile: Dispatch<SetStateAction<NullableProfile>>;
  games: NullableGroupedPlatinums;
  setGames: Dispatch<SetStateAction<NullableGroupedPlatinums>>;
  platinums: NullableGroupedPlatinumsKeys;
  setPlatinums: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>;
  completes: NullableGroupedPlatinumsKeys;
  setCompletes: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>;
  collection: NullableGroupedPlatinumsKeys;
  setCollection: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>;
}

type Context = DataContext;

const initialValue: Context = {
  status: "idle",
  setStatus: () => null,
  profile: null,
  setProfile: () => null,
  games: null,
  setGames: () => null,
  platinums: null,
  setPlatinums: () => null,
  completes: null,
  setCompletes: () => null,
  collection: null,
  setCollection: () => null,
};

const Context = createContext<Context>(initialValue);

const DataProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [status, setStatus] = useState<Context["status"]>(initialValue.status);
  const [profile, setProfile] = useLocalStorage<Context["profile"]>({
    key: profileKey,
    defaultValue: initialValue.profile,
  });
  const [games, setGames] = useLocalStorage<Context["games"]>({
    key: gamesKey,
    defaultValue: initialValue.games,
  });
  const [platinums, setPlatinums] = useLocalStorage<Context["platinums"]>({
    key: platinumsKey,
    defaultValue: initialValue.platinums,
  });
  const [completes, setCompletes] = useLocalStorage<Context["completes"]>({
    key: completesKey,
    defaultValue: initialValue.completes,
  });
  const [collection, setCollection] = useLocalStorage<Context["collection"]>({
    key: collectionKey,
    defaultValue: initialValue.collection,
  });

  const exposed: Context = useMemo(
    () => ({
      status,
      setStatus,
      profile,
      setProfile,
      games,
      setGames,
      platinums,
      setPlatinums,
      completes,
      setCompletes,
      collection,
      setCollection,
    }),
    [
      status,
      profile,
      setProfile,
      games,
      setGames,
      platinums,
      setPlatinums,
      completes,
      setCompletes,
      collection,
      setCollection,
    ],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): Context => useContext(Context);

export default DataProvider;
