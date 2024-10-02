"use client";

import type { ForwardRefRenderFunction } from "react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Spinner } from "@/components/ui/spinner";
import { ModalCloseButton } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export type UploadStatus = "generate" | "upload" | "complete" | "error";

interface UploadState {
  isVisible: boolean;
  status: UploadStatus;
  error: string | null;
  image: string | null;
  redirect: URL | null;
}

type StatusHandler = (params: Partial<UploadState>) => void;

interface UploadHandler {
  open: () => void;
  close: () => void;
  set: StatusHandler;
}

export interface ImageUploadPopupHandle {
  upload: UploadHandler;
}

const defaultState: UploadState = {
  isVisible: false,
  status: "generate",
  error: null,
  image: null,
  redirect: null,
};

const ImageUploadPopup: ForwardRefRenderFunction<ImageUploadPopupHandle> = (
  _props,
  ref,
) => {
  const [state, setState] = useState<UploadState>(defaultState);
  const { isVisible, status, error, image, redirect } = state;
  const isLoading = status === "generate" || status === "upload";

  const open = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: true }));
  }, []);

  const close = useCallback(() => {
    setState(defaultState);
  }, []);

  const set: StatusHandler = useCallback((params) => {
    setState((prev) => ({ ...prev, ...params }));
  }, []);

  const upload = useMemo(() => ({ open, close, set }), [close, open, set]);

  useImperativeHandle(ref, () => ({
    upload,
  }));

  if (!isVisible) return null;

  return (
    <div className="w-[360px] min-h-16 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background shadow-2xl p-4 z-10">
      {!isLoading && (
        <ModalCloseButton
          className="float-none absolute top-3 right-3"
          onClick={close}
        />
      )}
      <div className="w-full flex flex-col items-center justify-center gap-1">
        <div className="flex items-center">
          {isLoading && <Spinner className="size-4 mr-2" />}
          <p className="font-medium">
            {status === "generate" && "Generating..."}
            {status === "upload" && "Uploading..."}
            {status === "complete" && "Ready!"}
            {status === "error" && "Oops!"}
          </p>
        </div>
        <p className="mt-1 text-sm text-center">
          {status === "generate" && "The image is being created..."}
          {status === "upload" && "The image is uploading..."}
          {status === "complete" && "All done! Your link should be below."}
          {status === "error" && (error || "Something went wrong.")}
        </p>
        {image && (
          <a className="font-medium" href={image} target="_blank">
            {image}
          </a>
        )}
        {redirect && (
          <>
            <p className="text-sm text-center mt-1">
              If you&apos;re not redirected within 3 seconds, please click the
              link below.
            </p>
            <Button
              asChild
              variant="secondary"
              className="w-full mt-1"
              size="sm">
              <a href={redirect.toString()} target="_blank">
                Redirect
              </a>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default forwardRef(ImageUploadPopup);
