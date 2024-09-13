export type FetchSource = "alpha" | "bravo";

export interface FetchParams {
  id: string;
  source?: FetchSource;
}
