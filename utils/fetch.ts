"use server";

import { FETCH_URL } from "@/constants/variables";
import { parseProfile } from "./profile";
import { parsePlatinums } from "./trophies";
import type { Profile } from "@/models/profile";
import type { PlatinumsResponse } from "@/models/trophy";

const FETCH_PROFILE_URL = FETCH_URL + "/default/fetchProfile";
const FETCH_PLATINUMS_URL = FETCH_URL + "/fetchPlatinums";

export const fetchData = async (url: URL): Promise<string | null> => {
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

export const fetchProfile = async (psnId: string): Promise<Profile | null> => {
  const url = new URL(FETCH_PROFILE_URL);
  url.searchParams.set("psn_id", psnId);
  const response = await fetchData(url);
  if (!response) return null;
  return parseProfile(response);
};

export const fetchPlatinums = async (
  psnId: string,
  page: number,
): Promise<PlatinumsResponse | null> => {
  const url = new URL(FETCH_PLATINUMS_URL);
  url.searchParams.set("psn_id", psnId);
  url.searchParams.set("page", page.toString());
  const response = await fetchData(url);
  if (!response) return null;
  return parsePlatinums(response);
};
