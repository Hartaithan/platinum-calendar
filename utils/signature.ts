"use client";

import { SECRET } from "@/constants/variables";

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

export const getHeaders = async (
  method: string,
  url: string,
  body?: Record<string, unknown> | FormData,
): Promise<HeadersInit> => {
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const parts = url.split("?");
  const path = parts[0].replace(/^https?:\/\/[^\/]+/, "");
  const query = parts[1] || "";

  const data = {
    method,
    path,
    query,
    body: body ? JSON.stringify(body) : "",
    timestamp,
  };

  const signature = await hmacSHA256(JSON.stringify(data));

  return {
    Timestamp: timestamp,
    Authorization: signature,
  };
};
