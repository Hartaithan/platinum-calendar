import { API_URL } from "@/constants/variables";

type Params = Record<string, string | number | undefined>;

const getURL = (path: string, params?: Params) => {
  const url = new URL(API_URL);
  url.pathname += path;
  if (params) {
    const paramEntries = Object.entries(params);
    for (const [key, value] of paramEntries) {
      url.searchParams.set(key, value ? value.toString() : "");
    }
  }
  return url;
};

const get = async <T>(
  path: string,
  params: Params,
  init?: RequestInit,
): Promise<T> => {
  const url = getURL(path, params);
  const response = await fetch(url, init);
  const data = await response.json();
  if (!response.ok) throw Error(data?.message ?? "Unknown error");
  return data;
};

const post = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const url = getURL(path);
  const reqInit = { ...init, method: "POST" };
  const response = await fetch(url, reqInit);
  const data = await response.json();
  if (!response.ok) throw Error(data?.message ?? "Unknown error");
  return data;
};

export const fetchAPI = {
  get,
  post,
};
