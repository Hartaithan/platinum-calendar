import { UPLOAD_API_URL } from "@/constants/variables";
import type { ImageResponse } from "@/models/image";
import type { UploadResponse } from "@/models/upload";
import { getUploadHeaders } from "@/utils/upload";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const UPLOAD_URL = UPLOAD_API_URL + "/image";

export const POST = async (
  req: NextRequest,
): Promise<NextResponse<UploadResponse>> => {
  try {
    const form = await req.formData();
    if (!form) {
      console.error("param image not found");
      return NextResponse.json(
        { message: "Unable to find request form data", success: false },
        { status: 400 },
      );
    }

    const headers = getUploadHeaders();
    const request = await fetch(UPLOAD_URL, {
      headers,
      method: "POST",
      body: form,
    });
    const response: ImageResponse = await request.json();
    if (!request.ok) throw Error(JSON.stringify(response));
    if (!response.success) throw Error(response.data.error);

    return NextResponse.json({
      message: "Image successfully uploaded!",
      success: true,
      link: response?.data?.link,
    });
  } catch (error) {
    console.error("unable to upload image", error);
    return NextResponse.json(
      { message: "Unable to upload image", success: false },
      { status: 400 },
    );
  }
};
