import type { CachedResponse, DataKey } from "@/models/app";
import type { Trophy, TrophyCounts } from "@/models/trophy";

export type Platform = "PS5" | "PS4" | "PS3" | "PSVITA" | "PSPC";

export type CompletionType = "platinum" | "complete";

export interface Platinum {
  id: string;
  title: string;
  description?: string;
  platforms: Platform[];
  image_url: string;
  counts: TrophyCounts;
  earned_counts: TrophyCounts;
  progress: number;
  completion?: CompletionType;
  trophy?: Trophy;
}

export interface PlatinumCounts {
  total: number;
  platinum: number;
  complete: number;
}

export type NullablePlatinum = Platinum | null;
export type NullablePlatinums = Platinum[] | null;

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

export type PlatinumEventType = "progress" | "complete" | "error";

export interface PlatinumData<T extends PlatinumEventType> {
  type: T;
  message: string;
}

export interface PlatinumProgressData extends PlatinumData<"progress"> {
  current?: number;
  total?: number;
}

export interface PlatinumCompleteData extends PlatinumData<"complete"> {
  counts: PlatinumCounts;
  platinums?: NullablePlatinum[];
  expires?: string;
}

export type PlatinumErrorData = PlatinumData<"error">;

export type PlatinumEventData =
  | PlatinumProgressData
  | PlatinumCompleteData
  | PlatinumErrorData;

export interface FetchPlatinumsParams {
  id: string;
  onProgress: (data: PlatinumProgressData) => void;
  signal?: AbortSignal;
}

export interface FetchPlatinumsResponse extends CachedResponse {
  counts: PlatinumCounts;
  list: NullablePlatinum[];
}
