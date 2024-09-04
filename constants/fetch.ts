import type { FetchTarget } from "@/models/fetch";

export const FETCH_ALPHA_URL = process.env.NEXT_PUBLIC_FETCH_ALPHA_URL ?? "";
export const FETCH_BRAVO_URL = process.env.NEXT_PUBLIC_FETCH_BRAVO_URL ?? "";

export const FETCH_URL = {
  alpha: FETCH_ALPHA_URL,
  bravo: FETCH_BRAVO_URL,
};

export const defaultFetchTarget: FetchTarget = "alpha";
