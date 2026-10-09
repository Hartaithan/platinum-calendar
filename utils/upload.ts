import type { UploadBody } from "@/models/upload";
import { API } from "@/utils/api";
import type { UploadImageResponse } from "@hartaithan/trophy-scout/types";

export const getUploadImage = (
  image: UploadBody["image"],
  psnId: UploadBody["psnId"],
): File => {
  const name = `${psnId}’s Platinum Calendar`;
  const options: FilePropertyBag = { type: image.type };
  return new File([image], name, options);
};

export const uploadImage = async (
  file: Blob,
  name: string | undefined,
): Promise<UploadImageResponse> => {
  const psnId = name ?? "Platinum Calendar";
  const image = getUploadImage(file, psnId);
  const response = await API.uploadImage({ image });
  return response;
};
