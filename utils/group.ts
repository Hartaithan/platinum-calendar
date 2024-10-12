import type {
  GroupedPlatinumKeys,
  GroupedPlatinumList,
  GroupedPlatinums,
  Platinum,
} from "@/models/trophy";
import { getDateKeys } from "@/utils/date";

export const setGroupValue = (
  key: string,
  item: Platinum,
  result: GroupedPlatinumKeys,
) => {
  if (result[key] !== undefined) {
    result[key].push(item.game_id);
  } else {
    result[key] = [item.game_id];
  }
};

export const groupPlatinumList = (list: Platinum[]): GroupedPlatinumList => {
  let groups: GroupedPlatinumKeys = {};
  let platinums: GroupedPlatinums = {};
  for (const plat of list) {
    const { date, game_id } = plat;

    const keys = Object.values(getDateKeys(date));
    for (const key of keys) setGroupValue(key, plat, groups);

    platinums[game_id] = plat;
  }
  return { platinums, groups };
};
