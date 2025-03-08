import type {
  GroupedPlatinumKeys,
  GroupedPlatinumList,
  GroupedPlatinums,
  NullablePlatinum,
  Platinum,
} from "@/models/platinum";
import { getDateKeys } from "@/utils/date";

export const setGroupValue = (
  key: string,
  item: Platinum,
  result: GroupedPlatinumKeys,
) => {
  if (result[key] !== undefined) {
    result[key].push(item.id);
  } else {
    result[key] = [item.id];
  }
};

export const groupPlatinumList = (
  list: NullablePlatinum[],
): GroupedPlatinumList => {
  let groups: GroupedPlatinumKeys = {};
  let platinums: GroupedPlatinums = {};
  for (const plat of list) {
    if (!plat) continue;
    const { id, trophy } = plat;
    if (!trophy?.earned_at) continue;

    const keys = Object.values(getDateKeys(trophy.earned_at));
    for (const key of keys) setGroupValue(key, plat, groups);

    platinums[id] = plat;
  }
  return { platinums, groups };
};
