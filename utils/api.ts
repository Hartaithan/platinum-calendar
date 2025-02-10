"use client";

import { API_URL } from "@/constants/variables";
import type { FetchSourcesResponse } from "@/models/fetch";
import type { FetchProfileParams, ProfileResponse } from "@/models/profile";
import type { FetchPlatinumsParams, PlatinumsResponse } from "@/models/trophy";
import type { UploadResponse } from "@/models/upload";
import { getHeaders } from "@/utils/signature";

const statuses: Record<number, string> = {
  401: "Unauthorized",
  504: "The server took too long to respond. Please try again later",
};

const handleResponse = async (response: Response) => {
  if (statuses[response.status]) throw new Error(statuses[response.status]);
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message ?? "Unknown error");
  return data;
};

const getProfile = async (
  params: FetchProfileParams,
  init?: RequestInit,
): Promise<ProfileResponse> => {
  const { id, source = "alpha" } = params;
  const url = new URL(API_URL);
  url.pathname += "/" + source;
  url.pathname += "/" + id;
  url.pathname += "/profile";
  const headers = await getHeaders("GET", url.toString());
  const response = await fetch(url, { ...init, headers });
  return await handleResponse(response);
};

const getPlatinums = async (
  params: FetchPlatinumsParams,
  init?: RequestInit,
): Promise<PlatinumsResponse> => {
  const { id, source = "alpha", page } = params;
  const url = new URL(API_URL);
  url.pathname += "/" + source;
  url.pathname += "/" + id;
  url.pathname += "/platinums";
  if (page) url.searchParams.set("page", page.toString());
  const headers = await getHeaders("GET", url.toString());
  const response = await fetch(url, { ...init, headers });
  return await handleResponse(response);
};

const getSources = async (): Promise<FetchSourcesResponse> => {
  const url = new URL(API_URL);
  url.pathname += "/sources";
  const response = await fetch(url);
  return await handleResponse(response);
};

const uploadImage = async (body: FormData): Promise<UploadResponse> => {
  const url = new URL(API_URL);
  url.pathname += "/upload";
  const headers = await getHeaders("POST", url.toString(), body);
  const response = await fetch(url, { body, method: "POST", headers });
  return await handleResponse(response);
};

export const API = {
  getProfile,
  getPlatinums,
  getSources,
  uploadImage,
};
