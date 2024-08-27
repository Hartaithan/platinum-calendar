"use client";

import type { Dispatch, ForwardRefRenderFunction, SetStateAction } from "react";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import Spinner from "@/components/spinner";
import IconCircleCheck from "@/icons/circle-check";
import { useData } from "@/providers/data";
import type { Pages } from "@/models/app";

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
    <div className="w-[240px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background shadow-2xl px-6 py-4 text-text z-10">
      <h1 className="text-lg font-medium">Loading...</h1>
      <div className="flex justify-between items-center w-full mt-2">
        <p>Profile</p>
        {status === "profile-loading" ? (
          <Spinner className="size-5" />
        ) : (
          <IconCircleCheck className="size-5 stroke-focus" />
        )}
      </div>
      <div className="flex justify-between items-center w-full mt-2">
        <p>Platinums</p>
        <div className="flex items-center">
          {status === "platinums-loading" && (
            <p className="text-sm mr-2">
              {pages.current}/{pages.total}
            </p>
          )}
          {status === "platinums-loading" && pages.current > 0 && (
            <Spinner className="size-5" />
          )}
        </div>
      </div>
      <button
        className="mt-3 w-full bg-surface hover:bg-surface/50 rounded-md py-1"
        onClick={handleAbort}>
        Cancel
      </button>
    </div>
  );
};

export default forwardRef(DataLoadingPopup);
