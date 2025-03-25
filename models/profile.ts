import type { CachedResponse, Response } from "@/models/app";
import type { TrophyCounts } from "@/models/trophy";

export interface Profile {
  name: string;
  avatar_url: string;
  level: number;
  tier: number;
  progress: number;
  counts: TrophyCounts;
}

export type NullableProfile = Profile | null;

export interface ProfileResponseData extends CachedResponse {
  profile: Profile;
}

export type ProfileResponse = Response<ProfileResponseData>;

export interface FetchProfileParams {
  id: string;
  signal?: AbortSignal;
}
