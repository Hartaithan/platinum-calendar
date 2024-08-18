import { UPLOAD_CLIENT_ID } from "@/constants/variables";
import type { UploadBody } from "@/models/upload";
import { getLinkMessage } from "@/utils/link";

export const getUploadHeaders = (params?: HeadersInit): HeadersInit => {
  return { Authorization: `Client-ID ${UPLOAD_CLIENT_ID}`, ...params };
};

export const getUploadFormData = (
  image: UploadBody["image"],
  psnId: UploadBody["psnId"],
): FormData => {
  const { full } = getLinkMessage();
  const formData = new FormData();
  formData.append("type", "file");
  formData.append("title", `${psnId}'s Platinum Calendar`);
  formData.append("description", full);
  formData.append("image", image);
  return formData;
};
