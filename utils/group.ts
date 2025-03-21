import type { Settings } from "@/models/app";
import type {
  GroupedPlatinumData,
  GroupedPlatinumKeys,
  GroupedPlatinumList,
  GroupedPlatinums,
  NullableGroupedPlatinumData,
  NullablePlatinum,
  Platinum,
} from "@/models/platinum";
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

interface GetPlatinumListParams {
  key: string;
  settings: Settings;
  payload: NullableGroupedPlatinumData;
}

export const getPlatinumsListItems = (params: GetPlatinumListParams) => {
  const { key, settings, payload } = params;
  let items: string[] | null = null;
  const data = payload[settings.data];
  if (data) items = data[key];
  const count = items?.length || 0;
  const hasItems = !!items && items.length > 0;
  return { items, count, hasItems };
};
