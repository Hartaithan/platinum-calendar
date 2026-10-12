"use client";

import type { ImageUploadPopupHandle } from "@/components/image-upload-popup";
import ImageUploadPopup from "@/components/image-upload-popup";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCapture } from "@/providers/capture";
import { useData } from "@/providers/data";
import { useTheme } from "@/providers/theme";
import { API } from "@/utils/api";
import { getUploadImage } from "@/utils/upload";
import { TrophyScoutError } from "@hartaithan/trophy-scout";
import { SaveIcon, Share2Icon, UploadIcon } from "lucide-react";
import { useCallback, useRef, useState, type FC } from "react";
import { toast } from "sonner";

const ShareMenu: FC = () => {
  const { profile } = useData();
  const { capture } = useCapture();
  const { theme } = useTheme();
  const [isLoading, setLoading] = useState(false);
  const popupRef = useRef<ImageUploadPopupHandle>(null);
  const { upload } = popupRef.current ?? {};

  const handleSave = useCallback(async () => {
    const flow = API.flow("image_save", { theme });
    try {
      setLoading(true);
      flow.stage("generate");
      const image = await capture();
      if (!image) throw new TrophyScoutError("Unable to generate image");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(image);
      const timestamp = new Date().getTime().toString();
      link.download = `${profile?.name ?? "calendar"} [${[timestamp]}].png`;
      link.click();
      link.remove();
      flow.complete();
    } catch (error) {
      flow.fail(error);
      toast.error(API.getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [profile?.name, capture, theme]);

  const handleUpload = useCallback(async () => {
    const flow = API.flow("image_upload", { theme });
    try {
      upload?.open();
      setLoading(true);
      flow.stage("generate");
      const captured = await capture();
      if (!captured) throw new TrophyScoutError("Unable to generate image");
      upload?.set({ status: "upload" });
      const id = profile?.name ?? "Platinum Calendar";
      const image = getUploadImage(captured, id);
      const response = await API.uploadImage({ image, flow });
      upload?.set({ status: "complete", image: response.image.url });
      flow.complete();
    } catch (error) {
      flow.fail(error);
      const message = API.getErrorMessage(error);
      upload?.set({ status: "error", error: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [profile?.name, capture, upload, theme]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id="share-menu"
            variant="secondary"
            aria-label="Share"
            className="border border-input font-normal">
            <Share2Icon className="mr-3 size-5 stroke-[1.5]" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={handleSave}
            aria-label="Save as PNG">
            <SaveIcon className="mr-2 size-4" />
            <span>
              {isLoading && "In process.."}
              {!isLoading && "Save as PNG"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={handleUpload}
            aria-label="Upload image">
            <UploadIcon className="mr-2 size-4" />
            <span>
              {isLoading && "In process.."}
              {!isLoading && "Upload image"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ImageUploadPopup ref={popupRef} />
    </>
  );
};

export default ShareMenu;
