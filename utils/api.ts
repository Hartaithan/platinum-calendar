"use client";

import { API_URL } from "@/constants/variables";
import type {
  FetchPlatinumsParams,
  NullablePlatinum,
  PlatinumErrorData,
  PlatinumEventData,
} from "@/models/platinum";
import type { FetchProfileParams, ProfileResponse } from "@/models/profile";
import type { UploadResponse } from "@/models/upload";
import { readError } from "@/utils/error";
import { getHeaders } from "@/utils/signature";
import { EventSource } from "eventsource";

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
  const { id } = params;
  const url = new URL(API_URL);
  url.pathname += "/" + id;
  url.pathname += "/profile";
  const headers = await getHeaders("GET", url.toString());
  const response = await fetch(url, { ...init, headers });
  return await handleResponse(response);
};

const getPlatinums = async (
  params: FetchPlatinumsParams,
): Promise<NullablePlatinum[]> => {
  const { id, onProgress } = params;

  const url = new URL(API_URL);
  url.pathname += "/" + id;
  url.pathname += "/platinums";

  const headers = await getHeaders("GET", url.toString());
  const source = new EventSource(url, {
    fetch: (input, init) => fetch(input, { ...init, headers }),
  });

  return new Promise((resolve, reject) => {
    source.onmessage = (event) => {
      try {
        const data: PlatinumEventData = JSON.parse(event.data);
        switch (data?.type) {
          case "progress":
            onProgress(data);
            break;
          case "complete": {
            const platinums = data?.platinums || [];
            resolve(platinums);
            source.close();
            break;
          }
          default:
            console.info("unable to recognize event type", data);
            source.close();
            break;
        }
      } catch (error) {
        console.error("error parsing SSE data", error);
        source.close();
        const message = readError(error);
        reject(message);
      }
    };

    source.onerror = (e) => {
      try {
        const event = e as MessageEvent;
        const data: PlatinumErrorData = JSON.parse(event?.data);
        const message = data?.message ?? "Unknown SSE error";
        console.error("known SSE error", message, event);
        source.close();
        reject(message);
      } catch (error) {
        console.error("unknown SSE error", e, error);
        source.close();
        const message = readError(error);
        reject(message);
      }
    };
  });
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
  uploadImage,
};
