import type { PlatinumsResponse } from "@/models/trophy";
import { fetchPlatinums } from "@/utils/fetch";
import { readParams } from "@/utils/params";
import { parsePlatinums } from "@/utils/trophies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
): Promise<NextResponse<PlatinumsResponse>> => {
  const { id, page, source, params } = readParams(req);

  if (!id) {
    console.error("param id not found", params);
    return NextResponse.json(
      { message: "Missing required parameter: id" },
      { status: 400 },
    );
  }

  if (!page) {
    console.error("param page not found", params);
    return NextResponse.json(
      { message: "Missing required parameter: page" },
      { status: 400 },
    );
  }

  try {
    const response = await fetchPlatinums({ id, page, source });
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
