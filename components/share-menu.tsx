"use client";

import { useCallback, useRef, type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SaveIcon, Share2Icon, UploadIcon } from "lucide-react";
import { useData } from "@/providers/data";
import { toast } from "sonner";
import { readError } from "@/utils/error";
import type { ImageUploadPopupHandle } from "@/components/image-upload-popup";
import ImageUploadPopup from "@/components/image-upload-popup";
import { Button } from "@/components/ui/button";
import RedditIcon from "@/icons/reddit";
import { uploadImage } from "@/utils/upload";
import { getRedditLink } from "@/utils/share";
import { redirect } from "@/utils/navigation";

interface Props {
  generateImage: () => Promise<Blob | null>;
}

const ShareMenu: FC<Props> = (props) => {
  const { generateImage } = props;
  const { profile } = useData();
  const popupRef = useRef<ImageUploadPopupHandle>(null);
  const { upload } = popupRef.current ?? {};

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
      toast.error(message);
    }
  }, [profile?.name, generateImage]);

  const handleUpload = useCallback(async () => {
    try {
      upload?.open();
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      upload?.set({ status: "upload" });
      const response = await uploadImage(image, profile?.name);
      if (!response.success) throw new Error(response.message);
      upload?.set({ status: "complete", image: response.link });
    } catch (error) {
      console.error("upload error", error);
      const message = readError(error);
      upload?.set({ status: "error", error: message });
      toast.error(message);
    }
  }, [profile?.name, generateImage, upload]);

  const handleReddit = useCallback(async () => {
    try {
      upload?.open();
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      upload?.set({ status: "upload" });
      const response = await uploadImage(image, profile?.name);
      if (!response.success) throw Error(response.message);
      const link = getRedditLink(response.link, profile?.name);
      upload?.set({ status: "complete", image: response.link, redirect: link });
      redirect(link.toString(), "_blank");
    } catch (error) {
      console.error("reddit upload error", error);
      const message = readError(error);
      upload?.set({ status: "error", error: message });
      toast.error(message);
    }
  }, [profile?.name, generateImage, upload]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="border border-input font-normal">
            <Share2Icon className="size-5 stroke-[1.5] mr-3" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleSave}>
            <SaveIcon className="size-4 mr-2" />
            <span>Save as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpload}>
            <UploadIcon className="size-4 mr-2" />
            <span>Upload to Imgur</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleReddit}>
            <RedditIcon className="size-4 mr-2" />
            <span>Share on Reddit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ImageUploadPopup ref={popupRef} />
    </>
  );
};

export default ShareMenu;
