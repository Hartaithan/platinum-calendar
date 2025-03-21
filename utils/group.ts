import type { Settings } from "@/models/app";
import type {
  GroupedPlatinumData,
  GroupedPlatinumKeys,
  GroupedPlatinumList,
  GroupedPlatinums,
  NullablePlatinum,
  Platinum,
} from "@/models/platinum";
import type { DataContext } from "@/providers/data";
import { getDateKeys } from "@/utils/date";

const setItem = (key: string, item: Platinum, list: GroupedPlatinumKeys) => {
  if (list[key] !== undefined) {
    list[key].push(item.id);
  } else {
    list[key] = [item.id];
  }
};

interface SetGroupParams extends GroupedPlatinumData {
  key: string;
  item: Platinum;
}

export const setGroupValue = (params: SetGroupParams) => {
  const { key, item, platinums, completes, collection } = params;
  const isComplete = item.completion === "complete";
  if (isComplete) setItem(key, item, completes);
  else setItem(key, item, platinums);
  setItem(key, item, collection);
};

export const groupPlatinumList = (
  list: NullablePlatinum[],
): GroupedPlatinumList => {
  let games: GroupedPlatinums = {};
  let platinums: GroupedPlatinumKeys = {};
  let completes: GroupedPlatinumKeys = {};
  let collection: GroupedPlatinumKeys = {};
  for (const item of list) {
    if (!item) continue;
    const { id, trophy } = item;
    if (!trophy?.earned_at) continue;

    const keys = Object.values(getDateKeys(trophy.earned_at));
    for (const key of keys)
      setGroupValue({ key, item, platinums, completes, collection });

    games[id] = item;
  }
  return { games, platinums, completes, collection };
};

interface GetDataParams {
  key: string;
  settings: Settings;
  data: DataContext;
}

export const getDataItems = (params: GetDataParams) => {
  const { key, settings, data } = params;
  let items: string[] | null = null;
  const picked = data[settings.data];
  if (picked) items = picked[key];
  const count = items?.length || 0;
  const hasItems = !!items && items.length > 0;
  return { items, count, hasItems };
};
