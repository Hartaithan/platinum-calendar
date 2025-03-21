export type Theme = "og" | "heatmap" | "columns";

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

export type DataKey = "platinums" | "completes" | "collection";

export interface Settings {
  leap: boolean;
  data: DataKey;
}
