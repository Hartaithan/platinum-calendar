export type FetchSource = "alpha" | "bravo" | "charlie";

export interface FetchParams {
  id: string;
  source?: FetchSource;
}

export interface FetchPageParams {
  url: URL;
  source: FetchSource;
  init?: RequestInit;
}

export interface FetchSourceOption {
  label: string;
  value: FetchSource;
}

export type FetchWithInit<T, R> = (params: T, init?: RequestInit) => Promise<R>;
