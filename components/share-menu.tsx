import { useCallback, useRef, type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconDeviceFloppy from "@/icons/device-floppy";
import IconUpload from "@/icons/upload";
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
          Share
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleSave}>
            <div className="flex justify-center items-center size-4 mr-2">
              <IconDeviceFloppy className="size-4 stroke-1" />
            </div>
            <span>Save as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpload}>
            <div className="flex justify-center items-center size-4 mr-2">
              <IconUpload className="size-3" />
            </div>
            <span>Upload on Imgur</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ImageUploadPopup ref={popupRef} />
    </>
  );
};

export default ShareMenu;
