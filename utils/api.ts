import { API_URL } from "@/constants/variables";

export const fetchAPI = <T>(
  path: string,
  params: Record<string, string | number>,
): Promise<T> => {
  const baseURL = new URL(API_URL);
  baseURL.pathname += path;
  const paramEntries = Object.entries(params);
  for (const [key, value] of paramEntries) {
    baseURL.searchParams.set(key, value.toString());
  }
  return fetch(baseURL).then((res) => res.json());
};
