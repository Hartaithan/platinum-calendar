export interface TrophyCounts {
  total: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
}

export interface Platinum {
  game_image_url: string;
  trophy_image_url: string;
  title: string;
  description: string;
  number: number;
  date: string;
  achievers: number;
  owners: number;
  uncommon: number;
}

export interface PlatinumsResponse {
  list: Platinum[];
  current_page: number;
  previous_page: number | null;
  next_page: number | null;
}

export type NullablePlatinums = Platinum[] | null;
export type GroupedPlatinums = Record<string, Platinum[]>;
export type NullableGroupedPlatinums = GroupedPlatinums | null;

export type Pagination = Omit<PlatinumsResponse, "list"> | null;
