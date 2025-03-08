export type TrophyType = "platinum" | "gold" | "silver" | "bronze";

export type TrophyRarity = "ultra-rare" | "very-rare" | "rare" | "common";

export interface TrophyCounts {
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
  total?: number;
}

export interface Trophy {
  type: TrophyType;
  title?: string;
  description?: string;
  image_url?: string;
  earned_at?: string;
  earned_rate?: number;
  rarity?: TrophyRarity;
  rarity_label?: string;
}
