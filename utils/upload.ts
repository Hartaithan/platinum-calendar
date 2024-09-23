import { UPLOAD_CLIENT_ID } from "@/constants/variables";
import type { UploadBody, UploadResponse } from "@/models/upload";
import { getLinkMessage } from "@/utils/link";
import { fetchAPI } from "@/utils/api";

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
  formData.append("title", `${psnId}’s Platinum Calendar`);
  formData.append("description", full);
  formData.append("image", image);
  return formData;
};

export const uploadImage = async (
  image: Blob,
  name: string | undefined,
): Promise<UploadResponse> => {
  const psnId = name ?? "Platinum Calendar";
  const formData = getUploadFormData(image, psnId);
  const response = await fetchAPI.post<UploadResponse>("/upload", {
    body: formData,
  });
  return response;
};
