import type { TrophyCounts } from "./trophy";

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

export interface Profile {
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
  country: ProfileCountry | string;
  world_rank: string;
  country_rank: string;
  plus: boolean;
}

export type NullableProfile = Profile | null;
