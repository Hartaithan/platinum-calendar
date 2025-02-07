export type FetchSource = "alpha" | "bravo";

export interface FetchSourceOption {
  label: string;
  value: FetchSource;
}

export type FetchSourceDescriptions = Record<FetchSource, string>;

export interface FetchSourcesResponse {
  message: string;
  options: FetchSourceOption[];
  descriptions: FetchSourceDescriptions;
}
