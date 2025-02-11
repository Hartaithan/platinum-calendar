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
import posthog from "posthog-js";
import { withTheme } from "@/utils/analytics";

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
      posthog.capture("save-start", withTheme({ id: profile?.name }));
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(image);
      link.download = `${profile?.name ?? "calendar"}.png`;
      link.click();
      link.remove();
      posthog.capture("save-complete", withTheme({ id: profile?.name }));
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      toast.error(message);
      posthog.capture("save-error", withTheme({ id: profile?.name, message }));
    }
  }, [profile?.name, generateImage]);

  const handleUpload = useCallback(async () => {
    try {
      posthog.capture("upload-start", withTheme({ id: profile?.name }));
      upload?.open();
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      upload?.set({ status: "upload" });
      const response = await uploadImage(image, profile?.name);
      if (!response.success) throw new Error(response.message);
      upload?.set({ status: "complete", image: response.link });
      posthog.capture(
        "upload-complete",
        withTheme({
          id: profile?.name,
          link: response.link,
        }),
      );
    } catch (error) {
      console.error("upload error", error);
      const message = readError(error);
      upload?.set({ status: "error", error: message });
      toast.error(message);
      posthog.capture(
        "upload-error",
        withTheme({ id: profile?.name, message }),
      );
    }
  }, [profile?.name, generateImage, upload]);

  const handleReddit = useCallback(async () => {
    try {
      posthog.capture("reddit-start", withTheme({ id: profile?.name }));
      upload?.open();
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      upload?.set({ status: "upload" });
      const response = await uploadImage(image, profile?.name);
      if (!response.success) throw new Error(response.message);
      const link = getRedditLink(response.link, profile?.name);
      upload?.set({ status: "complete", image: response.link, redirect: link });
      redirect(link.toString(), "_blank");
      posthog.capture(
        "reddit-complete",
        withTheme({
          id: profile?.name,
          link: response.link,
        }),
      );
    } catch (error) {
      console.error("reddit upload error", error);
      const message = readError(error);
      upload?.set({ status: "error", error: message });
      toast.error(message);
      posthog.capture(
        "reddit-error",
        withTheme({ id: profile?.name, message }),
      );
    }
  }, [profile?.name, generateImage, upload]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id="share-menu"
            variant="secondary"
            aria-label="Share"
            className="border border-input font-normal">
            <Share2Icon className="size-5 stroke-[1.5] mr-3" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleSave} aria-label="Save as PNG">
            <SaveIcon className="size-4 mr-2" />
            <span>Save as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpload} aria-label="Upload image">
            <UploadIcon className="size-4 mr-2" />
            <span>Upload image</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleReddit} aria-label="Share on Reddit">
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
