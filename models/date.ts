export interface DateKeyParams {
  day?: number | null;
  month?: number | null;
  year?: number | null;
}

export type DateKey = "fullDate" | "dayAndMonth" | "month" | "monthAndYear";
