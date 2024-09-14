import type { UploadResponse } from "@/models/upload";
import type { Dispatch, ForwardRefRenderFunction, SetStateAction } from "react";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ModalCloseButton } from "@/components/ui/modal";

interface UploadState {
  isVisible: boolean;
  isLoading: boolean;
  response: UploadResponse | null;
}

export interface ImageUploadPopupHandle {
  setUpload: Dispatch<SetStateAction<UploadState>>;
}

const ImageUploadPopup: ForwardRefRenderFunction<ImageUploadPopupHandle> = (
  _props,
  ref,
) => {
  const [upload, setUpload] = useState<UploadState>({
    isVisible: false,
    isLoading: false,
    response: null,
  });
  const { isVisible, isLoading, response } = upload;

  const handleClose = useCallback(() => {
    setUpload((prev) => ({ ...prev, isVisible: false }));
  }, []);

  useImperativeHandle(ref, () => ({
    setUpload,
  }));

  if (!isVisible) return null;

  return (
    <div className="w-[360px] min-h-16 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background shadow-2xl px-6 py-4 z-10">
      {!isLoading && (
        <ModalCloseButton
          className="float-none absolute top-3 right-3"
          onClick={handleClose}
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
  );
};

export default forwardRef(ImageUploadPopup);
