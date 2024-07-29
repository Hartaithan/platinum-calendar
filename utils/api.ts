import { API_URL } from "@/constants/variables";

export const fetchAPI = <T>(
  path: string,
  params?: Record<string, string | number>,
  signal?: AbortSignal,
): Promise<T> => {
  const baseURL = new URL(API_URL);
  baseURL.pathname += path;
  if (params) {
    const paramEntries = Object.entries(params);
    for (const [key, value] of paramEntries) {
      baseURL.searchParams.set(key, value.toString());
    }
  }
  return fetch(baseURL, { signal }).then((res) => res.json());
};
