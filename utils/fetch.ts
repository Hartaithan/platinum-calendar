"use server";

import { FETCH_URL, defaultFetchSource } from "@/constants/fetch";
import { SERVICE_URL } from "@/constants/variables";
import type { FetchSource } from "@/models/fetch";
import type { FetchProfileParams } from "@/models/profile";
import type { FetchPlatinumsParams } from "@/models/trophy";

export const fetchPage = async (
  url: URL,
  source: FetchSource,
): Promise<string | null> => {
  try {
    const request = await fetch(url);
    const contentType = request.headers.get("content-type");
    const isJSON = contentType && contentType.includes("application/json");
    const response = isJSON ? await request.json() : await request.text();
    if (!request.ok) throw Error(response?.message ?? "Unknown error");
    switch (source) {
      case "bravo":
        return response?.body || response;
      default:
        return response;
    }
  } catch (error) {
    console.error("unable to fetch data", url.toString(), source, error);
    return null;
  }
};

export const fetchProfile = async (
  params: FetchProfileParams,
): Promise<string | null> => {
  const { id, source = defaultFetchSource } = params;
  let url: URL;
  switch (source) {
    case "bravo": {
      const pageUrl = SERVICE_URL + "/" + id;
      url = new URL(FETCH_URL[source]);
      url.searchParams.set("url", pageUrl);
      break;
    }
    default: {
      url = new URL(FETCH_URL[source] + "/default/fetchProfile");
      url.searchParams.set("psn_id", id);
      break;
    }
  }
  const response = await fetchPage(url, source);
  if (!response) return null;
  return response;
};

export const fetchPlatinums = async (
  params: FetchPlatinumsParams,
): Promise<string | null> => {
  const { id, page, source = defaultFetchSource } = params;
  let url: URL;
  switch (source) {
    case "bravo": {
      const pageUrl = new URL(`${SERVICE_URL}/${id}/log`);
      pageUrl.searchParams.set("type", "platinum");
      pageUrl.searchParams.set("page", page);
      url = new URL(FETCH_URL[source]);
      url.searchParams.set("url", pageUrl.toString());
      break;
    }
    default: {
      url = new URL(FETCH_URL[source] + "/fetchPlatinums");
      url.searchParams.set("psn_id", id);
      url.searchParams.set("page", page);
      break;
    }
  }
  const response = await fetchPage(url, source);
  if (!response) return null;
  return response;
};
