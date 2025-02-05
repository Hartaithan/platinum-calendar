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

export type Response<T = undefined> = ResponseBase & Partial<T>;

export interface CachedResponse {
  expires?: string;
}

export interface Settings {
  source: FetchSource;
  link: boolean;
  leap: boolean;
}
