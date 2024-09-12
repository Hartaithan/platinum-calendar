import type { FetchTarget } from "@/models/fetch";
import type { PlatinumsResponse } from "@/models/trophy";
import { fetchPlatinums } from "@/utils/fetch";
import { parsePlatinums } from "@/utils/trophies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
): Promise<NextResponse<PlatinumsResponse>> => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const target = (searchParams.get("target") as FetchTarget) ?? "alpha";

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

  try {
    const response = await fetchPlatinums({ id, page, target });
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
    console.error("unable to fetch platinums", id, error);
    return NextResponse.json(
      { message: "Unable to fetch platinums" },
      { status: 400 },
    );
  }
};
