import type { DataKey } from "@/models/app";
import type { Platinum } from "@hartaithan/trophy-scout/types";

export type GroupedPlatinums = Record<string, Platinum>;
export type NullableGroupedPlatinums = GroupedPlatinums | null;

export type GroupedPlatinumKeys = Record<string, string[]>;
export type NullableGroupedPlatinumsKeys = GroupedPlatinumKeys | null;

export type GroupedPlatinumData = Record<DataKey, GroupedPlatinumKeys>;
export type NullableGroupedPlatinumData = Record<
  DataKey,
  NullableGroupedPlatinumsKeys
>;

export interface GroupedPlatinumList extends GroupedPlatinumData {
  games: GroupedPlatinums;
}
