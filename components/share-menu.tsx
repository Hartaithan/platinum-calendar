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
import { redirectTo } from "@/utils/navigation";

interface Props {
  generateImage: () => Promise<Blob | null>;
}

const ShareMenu: FC<Props> = (props) => {
  const { generateImage } = props;
  const { profile } = useData();
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
      toast.error(message);
    }
  }, [profile?.name, generateImage]);

  const handleUpload = useCallback(async () => {
    try {
      setUpload?.({ isLoading: true, isVisible: true, response: null });
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      const response = await uploadImage(image, profile?.name);
      setUpload?.((prev) => ({ ...prev, isLoading: false, response }));
    } catch (error) {
      console.error("upload error", error);
      setUpload?.((prev) => ({ ...prev, isLoading: false, response: null }));
      const message = readError(error);
      toast.error(message);
    }
  }, [profile?.name, generateImage, setUpload]);

  const handleReddit = useCallback(async () => {
    try {
      setUpload?.({ isLoading: true, isVisible: true, response: null });
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      const response = await uploadImage(image, profile?.name);
      if (!response.success) throw Error(response.message);
      setUpload?.((prev) => ({ ...prev, isLoading: false, response }));
      const link = getRedditLink(response.link, profile?.name);
      redirectTo(link.toString(), "_blank");
    } catch (error) {
      console.error("reddit upload error", error);
      setUpload?.((prev) => ({ ...prev, isLoading: false, response: null }));
      const message = readError(error);
      toast.error(message);
    }
  }, [profile?.name, generateImage, setUpload]);

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
            <span>Upload on Imgur</span>
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
