import IconUpload from "@/icons/upload";
import type { UploadResponse } from "@/models/upload";
import { useData } from "@/providers/data";
import { fetchAPI } from "@/utils/api";
import { getUploadFormData } from "@/utils/upload";
import { useCallback, useState, type FC } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ModalCloseButton } from "@/components/modal";
import { useErrors } from "@/providers/errors";
import { readError } from "@/utils/error";

interface Props {
  generateImage: () => Promise<Blob | null>;
}

interface UploadState {
  isVisible: boolean;
  isLoading: boolean;
  response: UploadResponse | null;
}

const ImageUploadPopup: FC<Props> = (props) => {
  const { generateImage } = props;
  const { profile } = useData();
  const { addError } = useErrors();
  const [upload, setUpload] = useState<UploadState>({
    isVisible: false,
    isLoading: false,
    response: null,
  });
  const { isVisible, isLoading, response } = upload;

  const handleUpload = useCallback(async () => {
    try {
      setUpload({ isLoading: true, isVisible: true, response: null });
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      const psnId = profile?.name ?? "Platinum Calendar";
      const formData = getUploadFormData(image, psnId);
      const response = await fetchAPI.post<UploadResponse>("/upload", {
        body: formData,
      });
      setUpload((prev) => ({ ...prev, isLoading: false, response }));
    } catch (error) {
      console.error("upload error", error);
      setUpload((prev) => ({ ...prev, isLoading: false, response: null }));
      const message = readError(error);
      addError(message);
    }
  }, [profile?.name, generateImage, addError]);

  const handleClose = useCallback(() => {
    setUpload((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <>
      <Button
        variant="unstyled"
        className="flex items-center relative h-full rounded-md py-2 px-3 border border-input bg-primary"
        onClick={handleUpload}>
        <IconUpload className="size-4" />
      </Button>
      {isVisible && (
        <div className="w-[360px] min-h-16 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background shadow-2xl px-6 py-4 z-10">
          {!isLoading && (
            <ModalCloseButton
              className="float-none absolute top-3 right-3"
              onClose={handleClose}
            />
          )}
          {isLoading && <Spinner className="w-full my-4" />}
          {response && response.success && (
            <div className="w-full flex flex-col items-center justify-center gap-1">
              <p className="font-medium">{response.message}</p>
              <a href={response.link} target="_blank">
                {response.link}
              </a>
            </div>
          )}
          {response && !response.success && (
            <div className="w-full flex flex-col items-center justify-center">
              <p className="font-medium">{response.message}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageUploadPopup;
