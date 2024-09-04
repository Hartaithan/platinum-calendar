import type { RouteResponse } from "@/models/app";
import type { FetchParams } from "@/models/fetch";

export type TrophyType = "platinum" | "gold" | "silver" | "bronze";
export type TrophyTypeAll = "total" | TrophyType;

export type TrophyCounts = Record<TrophyTypeAll, number>;

export interface Game {
  id: string;
  title: string;
  image_url: string;
}

export interface Rarity {
  value: number;
  type: string;
}

export interface Platinum {
  game_id: string;
  game: Game;
  image_url: string;
  title: string;
  description: string;
  number: number;
  date: string;
  achievers: number;
  owners: number;
  rarity: Rarity;
}

export type NullablePlatinums = Platinum[] | null;
export type GroupedPlatinums = Record<string, Platinum>;
export type NullableGroupedPlatinums = GroupedPlatinums | null;
export type GroupedPlatinumKeys = Record<string, string[]>;
export type NullableGroupedPlatinumsKeys = GroupedPlatinumKeys | null;

export interface GroupedPlatinumList {
  groups: GroupedPlatinumKeys;
  platinums: GroupedPlatinums;
}

export type Pagination = Omit<PlatinumsResponse, "list"> | null;

export interface PlatinumsResponseData {
  list: Platinum[];
  current_page: number;
  previous_page: number | null;
  next_page: number | null;
}

export type PlatinumsResponse = RouteResponse<PlatinumsResponseData>;

export interface FetchPlatinumsParams extends FetchParams {
  page: string;
}
