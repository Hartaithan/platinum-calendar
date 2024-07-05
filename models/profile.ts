import type { TrophyCounts } from "./trophy";

export interface ProfileCountry {
  value: number;
  image_url: string;
}

export interface ProfilePlus {
  value: number;
  image_url: string;
}

export interface ProfileResponse {
  name: string;
  avatar_url: string;
  level: string;
  counts: TrophyCounts;
  games_played: string;
  completed_games: string;
  completion: string;
  unearned_trophies: string;
  trophies_per_day: string;
  views: string;
  country: ProfileCountry;
  world_rank: string;
  country_rank: string;
  plus: ProfilePlus;
}
