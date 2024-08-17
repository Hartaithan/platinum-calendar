import { FETCH_URL } from "@/constants/variables";
import type { PlatinumsResponse } from "@/models/trophy";
import { fetchPage } from "@/utils/fetch";
import { parsePlatinums } from "@/utils/trophies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const FETCH_PLATINUMS_URL = FETCH_URL + "/fetchPlatinums";

export const GET = async (
  req: NextRequest,
): Promise<NextResponse<PlatinumsResponse>> => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = searchParams.get("page");

  if (!id) {
    console.error("param id not found", searchParams);
    return NextResponse.json(
      { message: "Missing required parameter: id" },
      { status: 400 },
    );
  }

  if (!page) {
    console.error("param page not found", searchParams);
    return NextResponse.json(
      { message: "Missing required parameter: page" },
      { status: 400 },
    );
  }

  const url = new URL(FETCH_PLATINUMS_URL);
  url.searchParams.set("psn_id", id);
  url.searchParams.set("page", page.toString());

  try {
    const response = await fetchPage(url);
    if (!response) {
      return NextResponse.json(
        { message: "Unable to fetch platinums data" },
        { status: 400 },
      );
    }
    return NextResponse.json({
      message: "Platinums successfully fetched!",
      ...parsePlatinums(response),
    });
  } catch (error) {
    console.error("unable to fetch platinums", url.toString(), error);
    return NextResponse.json(
      { message: "Unable to fetch platinums" },
      { status: 400 },
    );
  }
};
