export type FetchTarget = "alpha" | "bravo";

export interface FetchParams {
  id: string;
  target?: FetchTarget;
}
