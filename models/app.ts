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

export type Device = "desktop" | "mobile";

export interface DeviceProps {
  device?: Device;
}

export type DataKey = "platinums" | "completes" | "collection";

export interface Settings {
  leap: boolean;
  data: DataKey;
  hide: boolean;
}
