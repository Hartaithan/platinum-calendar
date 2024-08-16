import type { TrophyCounts } from "@/models/trophy";
import type { RouteResponse } from "@/models/app";

export type ProfileCountry =
  | "ae"
  | "ar"
  | "at"
  | "au"
  | "be"
  | "bg"
  | "bh"
  | "bo"
  | "br"
  | "ca"
  | "ch"
  | "cl"
  | "cn"
  | "co"
  | "cr"
  | "cy"
  | "cz"
  | "de"
  | "dk"
  | "ec"
  | "es"
  | "fi"
  | "fr"
  | "gb"
  | "gr"
  | "gt"
  | "hk"
  | "hn"
  | "hr"
  | "hu"
  | "id"
  | "ie"
  | "il"
  | "in"
  | "is"
  | "it"
  | "jp"
  | "kr"
  | "kw"
  | "lb"
  | "lu"
  | "mt"
  | "mx"
  | "my"
  | "ni"
  | "nl"
  | "no"
  | "nz"
  | "om"
  | "pa"
  | "pe"
  | "pl"
  | "pt"
  | "py"
  | "qa"
  | "ro"
  | "ru"
  | "sa"
  | "se"
  | "sg"
  | "si"
  | "sk"
  | "sv"
  | "th"
  | "tr"
  | "tw"
  | "ua"
  | "us"
  | "uy"
  | "za";

export interface ProfileLevel {
  value: number;
  progress: number;
}

export interface Profile {
  name: string;
  avatar_url: string;
  level: ProfileLevel;
  counts: TrophyCounts;
  games_played: number;
  completed_games: number;
  completion: number;
  unearned_trophies: number;
  trophies_per_day: number;
  views: number;
  country: ProfileCountry | string;
  world_rank: number;
  country_rank: number;
  plus: boolean;
}

export type NullableProfile = Profile | null;

export interface ProfileResponseData {
  profile: Profile;
}

export type ProfileResponse = RouteResponse<ProfileResponseData>;
