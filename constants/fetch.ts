import type { FetchSource, FetchSourceOption } from "@/models/fetch";

export const FETCH_CHARLIE_API_KEY =
  process.env.NEXT_PUBLIC_FETCH_CHARLIE_API_KEY ?? "";
export const FETCH_CHARLIE_HOST =
  process.env.NEXT_PUBLIC_FETCH_CHARLIE_HOST ?? "";

export const FETCH_URL: Record<FetchSource, string> = {
  alpha: process.env.NEXT_PUBLIC_FETCH_ALPHA_URL ?? "",
  bravo: process.env.NEXT_PUBLIC_FETCH_BRAVO_URL ?? "",
  charlie: process.env.NEXT_PUBLIC_FETCH_CHARLIE_URL ?? "",
};

export const defaultFetchSource: FetchSource = "charlie";

export const fetchSourceOptions: FetchSourceOption[] = Object.keys(
  FETCH_URL,
).map((key) => ({
  label: key.charAt(0).toUpperCase() + key.slice(1),
  value: key as FetchSource,
}));
