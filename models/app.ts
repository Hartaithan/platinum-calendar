import type { FetchSource } from "@/models/fetch";

export type Theme = "og" | "heatmap";

export type Status =
  | "idle"
  | "profile-loading"
  | "platinums-loading"
  | "completed";

export interface Pages {
  current: number;
  total: number;
}

interface ResponseBase {
  message: string;
}

export type RouteResponse<T = undefined> = ResponseBase & Partial<T>;

export interface Settings {
  source: FetchSource;
  link: boolean;
  leap: boolean;
}
