import type { Settings } from "@/models/app";
import type {
  GroupedPlatinumKeys,
  GroupedPlatinumList,
  GroupedPlatinums,
  NullableGroupedPlatinumsKeys,
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

interface SetGroupParams {
  key: string;
  item: Platinum;
  groups: GroupedPlatinumKeys;
  completes: GroupedPlatinumKeys;
}

export const setGroupValue = (params: SetGroupParams) => {
  const { key, item, groups, completes } = params;
  const isComplete = item.completion === "complete";
  if (!isComplete) setItem(key, item, groups);
  setItem(key, item, completes);
};

export const groupPlatinumList = (
  list: NullablePlatinum[],
): GroupedPlatinumList => {
  let groups: GroupedPlatinumKeys = {};
  let completes: GroupedPlatinumKeys = {};
  let platinums: GroupedPlatinums = {};
  for (const item of list) {
    if (!item) continue;
    const { id, trophy } = item;
    if (!trophy?.earned_at) continue;

    const keys = Object.values(getDateKeys(trophy.earned_at));
    for (const key of keys) setGroupValue({ key, item, groups, completes });

    platinums[id] = item;
  }
  return { platinums, groups, completes };
};

interface GetPlatinumListParams {
  key: string;
  groups: NullableGroupedPlatinumsKeys;
  completes: NullableGroupedPlatinumsKeys;
  settings: Settings;
}

export const getPlatinumsListItems = (params: GetPlatinumListParams) => {
  const { key, groups, completes, settings } = params;
  let items: string[] | null = null;
  const data = settings.completes ? completes : groups;
  if (data) items = data[key];
  const count = items?.length || 0;
  const hasItems = !!items && items.length > 0;
  return { items, count, hasItems };
};
