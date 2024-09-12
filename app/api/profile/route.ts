import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { fetchProfile } from "@/utils/fetch";
import { parseProfile } from "@/utils/profile";
import type { ProfileResponse } from "@/models/profile";
import type { FetchTarget } from "@/models/fetch";

export const GET = async (
  req: NextRequest,
): Promise<NextResponse<ProfileResponse>> => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const target = (searchParams.get("target") as FetchTarget) ?? "alpha";

  if (!id) {
    console.error("param id not found", searchParams);
    return NextResponse.json(
      { message: "Missing required parameter: id" },
      { status: 400 },
    );
  }

  try {
    const response = await fetchProfile({ id, target });
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
    console.error("unable to fetch profile", id, error);
    return NextResponse.json(
      { message: "Unable to fetch profile" },
      { status: 400 },
    );
  }
};
