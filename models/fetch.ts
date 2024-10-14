export type FetchSource = "alpha" | "bravo";

export interface FetchParams {
  id: string;
  source?: FetchSource;
}

export interface FetchPageParams {
  url: URL;
  source: FetchSource;
  init?: RequestInit;
}

export type FetchWithInit<T, R> = (params: T, init?: RequestInit) => Promise<R>;
