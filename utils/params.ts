import { defaultFetchSource } from "@/constants/fetch";
import type { FetchSource } from "@/models/fetch";
import type { NextRequest } from "next/server";

export const readParams = (req: NextRequest) => {
  const { searchParams: params } = new URL(req.url);
  const id = params.get("id");
  const page = params.get("page");
  const source = (params.get("source") as FetchSource) ?? defaultFetchSource;
  return { id, page, source, params: params.toString() };
};
