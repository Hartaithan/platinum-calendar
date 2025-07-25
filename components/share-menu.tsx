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
import { withTheme } from "@/utils/analytics";
import { readError } from "@/utils/error";
import { uploadImage } from "@/utils/upload";
import { SaveIcon, Share2Icon, UploadIcon } from "lucide-react";
import posthog from "posthog-js";
import { useCallback, useRef, useState, type FC } from "react";
import { toast } from "sonner";

const ShareMenu: FC = () => {
  const { profile } = useData();
  const { capture } = useCapture();
  const [isLoading, setLoading] = useState(false);
  const popupRef = useRef<ImageUploadPopupHandle>(null);
  const { upload } = popupRef.current ?? {};

  const handleSave = useCallback(async () => {
    try {
      posthog.capture("save-start", withTheme({ id: profile?.name }));
      setLoading(true);
      const image = await capture();
      if (!image) throw new Error("Unable to generate image");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(image);
      const timestamp = new Date().getTime().toString();
      link.download = `${profile?.name ?? "calendar"} [${[timestamp]}].png`;
      link.click();
      link.remove();
      posthog.capture("save-complete", withTheme({ id: profile?.name }));
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      toast.error(message);
      posthog.capture("save-error", withTheme({ id: profile?.name, message }));
    } finally {
      setLoading(false);
    }
  }, [profile?.name, capture]);

  const handleUpload = useCallback(async () => {
    try {
      posthog.capture("upload-start", withTheme({ id: profile?.name }));
      upload?.open();
      setLoading(true);
      const image = await capture();
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
    } finally {
      setLoading(false);
    }
  }, [profile?.name, capture, upload]);

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
