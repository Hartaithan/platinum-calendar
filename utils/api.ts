import { API_URL } from "@/constants/variables";

type Params = Record<string, string | number | undefined>;

const statuses: Record<number, string> = {
  504: "The server took too long to respond. Please try again later",
};

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

const handleResponse = async (response: Response) => {
  if (statuses[response.status]) throw new Error(statuses[response.status]);
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message ?? "Unknown error");
  return data;
};

const get = async <T>(
  path: string,
  params: Params,
  init?: RequestInit,
): Promise<T> => {
  const url = getURL(path, params);
  const response = await fetch(url, init);
  return await handleResponse(response);
};

const post = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const url = getURL(path);
  const response = await fetch(url, { ...init, method: "POST" });
  return await handleResponse(response);
};

export const API = {
  get,
  post,
};
