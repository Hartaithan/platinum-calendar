import type { UploadBody } from "@/models/upload";

export const getUploadImage = (
  image: UploadBody["image"],
  psnId: UploadBody["psnId"],
): File => {
  const name = `${psnId}’s Platinum Calendar`;
  const options: FilePropertyBag = { type: image.type };
  return new File([image], name, options);
};
