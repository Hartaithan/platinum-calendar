"use server";

import { FETCH_URL } from "@/constants/variables";

const FETCH_PROFILE_URL = FETCH_URL + "/default/fetchProfile";
const FETCH_PLATINUMS_URL = FETCH_URL + "/fetchPlatinums";

const fetchData = async (url: URL): Promise<string | null> => {
  try {
    const request = await fetch(url);
    const contentType = request.headers.get("content-type");
    const isJSON = contentType && contentType.includes("application/json");
    const response = isJSON ? await request.json() : await request.text();
    if (!request.ok) throw Error(response?.message ?? "Unknown error");
    return response;
  } catch (error) {
    console.error("unable to fetch data", url.toString(), error);
    return null;
  }
};

export const fetchProfile = async (psnId: string): Promise<string | null> => {
  const url = new URL(FETCH_PROFILE_URL);
  url.searchParams.set("psn_id", psnId);
  const response = await fetchData(url);
  return response;
};

export const fetchPlatinums = async (
  psnId: string,
  page: number,
): Promise<string | null> => {
  const url = new URL(FETCH_PLATINUMS_URL);
  url.searchParams.set("psn_id", psnId);
  url.searchParams.set("page", page.toString());
  const response = await fetchData(url);
  return response;
};
