"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Pages } from "@/models/app";
import { useData } from "@/providers/data";
import { CircleCheckIcon } from "lucide-react";
import type { Dispatch, ForwardRefRenderFunction, SetStateAction } from "react";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

interface Props {
  handleAbort: () => void;
}

export interface DataLoadingPopupHandle {
  setPages: Dispatch<SetStateAction<Pages>>;
  reset: () => void;
}

const defaultPages: Pages = { current: 0, total: 10 };

const DataLoadingPopup: ForwardRefRenderFunction<
  DataLoadingPopupHandle,
  Props
> = (props, ref) => {
  const { handleAbort } = props;
  const { status } = useData();
  const [pages, setPages] = useState<Pages>(defaultPages);

  const handleReset = useCallback(() => {
    setPages(defaultPages);
  }, []);

  useImperativeHandle(ref, () => ({
    setPages,
    reset: handleReset,
  }));

  if (status === "idle") return null;
  if (status === "completed") return null;

  return (
    <div className="fixed left-1/2 top-1/2 z-10 w-[240px] -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-background px-5 py-4 shadow-2xl">
      <h1 className="text-lg font-medium">Loading...</h1>
      <div className="mt-2 flex w-full items-center justify-between">
        <p>Profile</p>
        {status === "profile-loading" ? (
          <Spinner className="size-5" />
        ) : (
          <CircleCheckIcon className="size-5 stroke-ring" />
        )}
      </div>
      <div className="mt-2 flex w-full items-center justify-between">
        <p>Platinums</p>
        <div className="flex items-center">
          {status === "platinums-loading" && (
            <p className="mr-2 text-sm">
              {Math.round((pages.current / pages.total) * 100)}%
            </p>
          )}
          {status === "platinums-loading" && pages.current > 0 && (
            <Spinner className="size-5" />
          )}
        </div>
      </div>
      <Button
        variant="secondary"
        className="mt-3 h-8 w-full"
        aria-label="Cancel data loading"
        onClick={handleAbort}>
        Cancel
      </Button>
    </div>
  );
};

export default forwardRef(DataLoadingPopup);
