"use server";

import { FETCH_URL } from "@/constants/variables";
import type { FetchProfileParams } from "@/models/profile";
import type { FetchPlatinumsParams } from "@/models/trophy";

export const fetchPage = async (url: URL): Promise<string | null> => {
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

export const fetchProfile = async (
  params: FetchProfileParams,
): Promise<string | null> => {
  const { id } = params;
  const url = new URL(FETCH_URL + "/default/fetchProfile");
  url.searchParams.set("psn_id", id);
  const response = await fetchPage(url);
  if (!response) return null;
  return response;
};

export const fetchPlatinums = async (
  params: FetchPlatinumsParams,
): Promise<string | null> => {
  const { id, page } = params;
  const url = new URL(FETCH_URL + "/fetchPlatinums");
  url.searchParams.set("psn_id", id);
  url.searchParams.set("page", page);
  const response = await fetchPage(url);
  if (!response) return null;
  return response;
};
