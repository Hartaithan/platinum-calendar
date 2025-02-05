import type { FetchSource, FetchSourceOption } from "@/models/fetch";

export const FETCH_URL: Record<FetchSource, string> = {
  alpha: process.env.NEXT_PUBLIC_FETCH_ALPHA_URL ?? "",
  bravo: process.env.NEXT_PUBLIC_FETCH_BRAVO_URL ?? "",
};

export const defaultFetchSource: FetchSource = "alpha";

export const fetchSourceOptions: FetchSourceOption[] = Object.keys(
  FETCH_URL,
).map((key) => ({
  label: key.charAt(0).toUpperCase() + key.slice(1),
  value: key as FetchSource,
}));
