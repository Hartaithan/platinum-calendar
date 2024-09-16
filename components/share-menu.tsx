import { useCallback, useRef, type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SaveIcon, Share2Icon, UploadIcon } from "lucide-react";
import { useData } from "@/providers/data";
import { useErrors } from "@/providers/errors";
import { readError } from "@/utils/error";
import type { UploadResponse } from "@/models/upload";
import { getUploadFormData } from "@/utils/upload";
import { fetchAPI } from "@/utils/api";
import type { ImageUploadPopupHandle } from "@/components/image-upload-popup";
import ImageUploadPopup from "@/components/image-upload-popup";

interface Props {
  generateImage: () => Promise<Blob | null>;
}

const ShareMenu: FC<Props> = (props) => {
  const { generateImage } = props;
  const { profile } = useData();
  const { addError } = useErrors();
  const popupRef = useRef<ImageUploadPopupHandle>(null);
  const { setUpload } = popupRef.current ?? {};

  const handleSave = useCallback(async () => {
    try {
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(image);
      link.download = `${profile?.name ?? "calendar"}.png`;
      link.click();
      link.remove();
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      addError(message);
    }
  }, [profile?.name, generateImage, addError]);

  const handleUpload = useCallback(async () => {
    try {
      setUpload?.({ isLoading: true, isVisible: true, response: null });
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      const psnId = profile?.name ?? "Platinum Calendar";
      const formData = getUploadFormData(image, psnId);
      const response = await fetchAPI.post<UploadResponse>("/upload", {
        body: formData,
      });
      setUpload?.((prev) => ({ ...prev, isLoading: false, response }));
    } catch (error) {
      console.error("upload error", error);
      setUpload?.((prev) => ({ ...prev, isLoading: false, response: null }));
      const message = readError(error);
      addError(message);
    }
  }, [profile?.name, generateImage, setUpload, addError]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center relative h-full rounded-md py-2 px-3 border border-input bg-primary text-sm">
          <Share2Icon className="size-5 stroke-[1.5] mr-3" />
          <span>Share</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleSave}>
            <SaveIcon className="size-4 mr-2" />
            <span>Save as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpload}>
            <UploadIcon className="size-4 mr-2" />
            <span>Upload on Imgur</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ImageUploadPopup ref={popupRef} />
    </>
  );
};

export default ShareMenu;
