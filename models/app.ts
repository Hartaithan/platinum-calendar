export type Status =
  | "idle"
  | "profile-loading"
  | "platinums-loading"
  | "completed";

export interface DateKeyParams {
  day?: number;
  month?: number;
  year?: number;
}

export type DateKey = "fullDate" | "dayAndMonth" | "month" | "monthAndYear";
