export interface TrophyCounts {
  total: string;
  platinum: string;
  gold: string;
  silver: string;
  bronze: string;
}

export interface Platinum {
  game_image_url: string;
  trophy_image_url: string;
  title: string;
  description: string;
  number: string;
  date: string;
  achievers: string;
  owners: string;
  uncommon: string;
}

export interface PlatinumsResponse {
  list: Platinum[];
  current_page: number;
  previous_page: number | null;
  next_page: number | null;
}

export type NullablePlatinums = Platinum[] | null;

export type Pagination = Omit<PlatinumsResponse, "list"> | null;
