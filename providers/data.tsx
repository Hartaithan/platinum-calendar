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
  NullablePlatinum,
} from "@/models/platinum";
import type { NullableProfile } from "@/models/profile";
import { groupPlatinumList } from "@/utils/group";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface DataContext {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  profile: NullableProfile;
  setProfile: Dispatch<SetStateAction<NullableProfile>>;
  games: NullableGroupedPlatinums;
  platinums: NullableGroupedPlatinumsKeys;
  completes: NullableGroupedPlatinumsKeys;
  collection: NullableGroupedPlatinumsKeys;
  setData: (list: NullablePlatinum[]) => void;
}

type Context = DataContext;

const initialValue: Context = {
  status: "idle",
  setStatus: () => null,
  profile: null,
  setProfile: () => null,
  games: null,
  platinums: null,
  completes: null,
  collection: null,
  setData: () => null,
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

  const setData = useCallback(
    (list: NullablePlatinum[]) => {
      const grouped = groupPlatinumList(list);
      setGames(grouped.games);
      setPlatinums(grouped.platinums);
      setCompletes(grouped.completes);
      setCollection(grouped.collection);
    },
    [setGames, setPlatinums, setCompletes, setCollection],
  );

  const exposed: Context = useMemo(
    () => ({
      status,
      setStatus,
      profile,
      setProfile,
      games,
      platinums,
      completes,
      collection,
      setData,
    }),
    [
      status,
      profile,
      setProfile,
      games,
      platinums,
      completes,
      collection,
      setData,
    ],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): Context => useContext(Context);

export default DataProvider;
