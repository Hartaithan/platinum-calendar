import type { UploadBody, UploadResponse } from "@/models/upload";
import { getLinkMessage } from "@/utils/link";
import { API } from "@/utils/api";

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
  const payload = { body: formData };
  const response = await API.post<UploadResponse>("/upload", payload);
  return response;
};
