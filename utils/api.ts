"use client";

import { API_URL } from "@/constants/variables";
import type {
  FetchPlatinumsParams,
  FetchPlatinumsResponse,
  PlatinumErrorData,
  PlatinumEventData,
} from "@/models/platinum";
import type { FetchProfileParams, ProfileResponse } from "@/models/profile";
import type { UploadResponse } from "@/models/upload";
import { readError } from "@/utils/error";
import { getInit } from "@/utils/signature";
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
): Promise<ProfileResponse> => {
  const { id, signal } = params;
  const url = new URL(API_URL);
  url.pathname += "/" + id;
  url.pathname += "/profile";
  const init = await getInit({ method: "GET", url, signal });
  const response = await fetch(url, init);
  return await handleResponse(response);
};

const getPlatinums = async (
  params: FetchPlatinumsParams,
): Promise<FetchPlatinumsResponse> => {
  const { id, onProgress, signal } = params;

  const url = new URL(API_URL);
  url.pathname += "/" + id;
  url.pathname += "/platinums";

  const init = await getInit({ method: "GET", url });
  const source = new EventSource(url, {
    fetch: (input, ini) => fetch(input, { ...ini, ...init }),
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
            const list = data?.platinums || [];
            const expires = data?.expires;
            const counts = data?.counts;
            resolve({ list, counts, expires });
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

    if (signal) {
      const abortHandler = (event: Event) => {
        source.close();
        let message = "Unknown abort signal error";
        if (event.target instanceof AbortSignal) message = event.target.reason;
        signal.removeEventListener("abort", abortHandler);
        reject(message);
      };
      signal.addEventListener("abort", abortHandler);
    }
  });
};

const uploadImage = async (body: FormData): Promise<UploadResponse> => {
  const url = new URL(API_URL);
  url.pathname += "/upload";
  const init = await getInit({ method: "POST", url, body });
  const response = await fetch(url, init);
  return await handleResponse(response);
};

export const API = {
  getProfile,
  getPlatinums,
  uploadImage,
};
