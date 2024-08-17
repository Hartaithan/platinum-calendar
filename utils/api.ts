import { API_URL } from "@/constants/variables";

type Params = Record<string, string | number | undefined>;

const getURL = (path: string, params: Params) => {
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

const get = <T>(
  path: string,
  params: Params,
  init?: RequestInit,
): Promise<T> => {
  const url = getURL(path, params);
  return fetch(url, init).then((res) => res.json());
};

const post = <T>(
  path: string,
  params: Params,
  init?: RequestInit,
): Promise<T> => {
  const url = getURL(path, params);
  const reqInit = { ...init, method: "POST" };
  return fetch(url, reqInit).then((res) => res.json());
};

export const fetchAPI = {
  get,
  post,
};
