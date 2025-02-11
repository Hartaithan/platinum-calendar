import type { UploadBody, UploadResponse } from "@/models/upload";
import { API } from "@/utils/api";

export const getUploadFormData = (
  image: UploadBody["image"],
  psnId: UploadBody["psnId"],
): FormData => {
  const formData = new FormData();
  formData.append("title", `${psnId}’s Platinum Calendar`);
  formData.append("image", image);
  return formData;
};

export const uploadImage = async (
  image: Blob,
  name: string | undefined,
): Promise<UploadResponse> => {
  const psnId = name ?? "Platinum Calendar";
  const formData = getUploadFormData(image, psnId);
  const response = await API.uploadImage(formData);
  return response;
};
