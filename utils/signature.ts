"use client";

import { SECRET } from "@/constants/variables";

type Body = Record<string, unknown> | string | FormData;

const parseBody = (value: Body | null | undefined, emptyValue = "") => {
  if (!value) return emptyValue;
  if (typeof value === "string") return value;
  if (Object.keys(value).length === 0) return emptyValue;
  return JSON.stringify(value);
};

const hmacSHA256 = async (message: string) => {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    buffer,
    encoder.encode(message),
  );

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

interface InitParams {
  method: string;
  url: URL | string;
  body?: Body;
  signal?: AbortSignal;
}

export const getInit = async (params: InitParams): Promise<RequestInit> => {
  const { method, url, body, signal } = params;
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const parts = url.toString().split("?");
  // eslint-disable-next-line no-useless-escape
  const path = parts[0].replace(/^https?:\/\/[^\/]+/, "");
  const query = parts[1] || "";
  const parsed = parseBody(body);

  const data = { method, path, query, body: parsed, timestamp };
  const signature = await hmacSHA256(JSON.stringify(data));

  const headers: HeadersInit = {
    Timestamp: timestamp,
    Authorization: signature,
  };
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return { method, headers, body: parsed, signal };
};
