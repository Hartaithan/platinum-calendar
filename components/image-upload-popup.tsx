"use client";

import { Button } from "@/components/ui/button";
import { ModalCloseButton } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";
import type { ForwardRefRenderFunction } from "react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

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
    <div className="fixed left-1/2 top-1/2 z-10 min-h-16 w-[360px] -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-background p-4 shadow-2xl">
      {!isLoading && (
        <ModalCloseButton
          className="absolute right-3 top-3 float-none"
          onClick={close}
        />
      )}
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <div className="flex items-center">
          {isLoading && <Spinner className="mr-2 size-4" />}
          <p className="font-medium">
            {status === "generate" && "Generating..."}
            {status === "upload" && "Uploading..."}
            {status === "complete" && "Ready!"}
            {status === "error" && "Oops!"}
          </p>
        </div>
        <p className="mt-1 text-center text-sm">
          {status === "generate" && "The image is being created..."}
          {status === "upload" && "The image is uploading..."}
          {status === "complete" && "All done! Your link should be below."}
          {status === "error" && (error || "Something went wrong.")}
        </p>
        {image && (
          <a className="text-center font-medium" href={image} target="_blank">
            {image}
          </a>
        )}
        {redirect && (
          <>
            <p className="mt-1 text-center text-sm">
              If you&apos;re not redirected within 3 seconds, please click the
              link below.
            </p>
            <Button
              asChild
              aria-label="Redirect to generated link"
              variant="secondary"
              className="mt-1 w-full"
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
