export type Theme = "og";

export type Status =
  | "idle"
  | "profile-loading"
  | "platinums-loading"
  | "completed";

export interface Pages {
  current: number;
  total: number;
}
