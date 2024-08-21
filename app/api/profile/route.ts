import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { FETCH_URL } from "@/constants/variables";
import { fetchPage } from "@/utils/fetch";
import { parseProfile } from "@/utils/profile";
import type { ProfileResponse } from "@/models/profile";

const FETCH_PROFILE_URL = FETCH_URL + "/default/fetchProfile";

export const GET = async (
  req: NextRequest,
): Promise<NextResponse<ProfileResponse>> => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    console.error("param id not found", searchParams);
    return NextResponse.json(
      { message: "Missing required parameter: id" },
      { status: 400 },
    );
  }

  const url = new URL(FETCH_PROFILE_URL);
  url.searchParams.set("psn_id", id);

  try {
    const response = await fetchPage(url);
    if (!response) {
      return NextResponse.json(
        { message: "Unable to fetch profile data" },
        { status: 400 },
      );
    }
    const parsed = parseProfile(response);
    if (!parsed) {
      return NextResponse.json(
        { message: "Profile doesn't exist" },
        { status: 400 },
      );
    }
    return NextResponse.json({
      message: "Profile successfully fetched!",
      profile: parsed,
    });
  } catch (error) {
    console.error("unable to fetch profile", id, url.toString(), error);
    return NextResponse.json(
      { message: "Unable to fetch profile" },
      { status: 400 },
    );
  }
};
