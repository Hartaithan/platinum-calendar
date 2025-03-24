"use client";

import type { DataLoadingPopupHandle } from "@/components/data-loading-popup";
import DataLoadingPopup from "@/components/data-loading-popup";
import { useAbortController } from "@/hooks/use-abort-controller";
import type { PlatinumProgressData } from "@/models/platinum";
import { useData } from "@/providers/data";
import { API } from "@/utils/api";
import { readError } from "@/utils/error";
import { showExpiresToast } from "@/utils/toast";
import posthog from "posthog-js";
import type { FC, FormEvent, FormEventHandler, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import { toast } from "sonner";

interface Context {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface Form extends HTMLFormControlsCollection {
  id: { value: string };
}

const errors = {
  empty: "Enter your PSN ID. This field cannot be empty",
  fetch: "Unable to fetch profile",
};

const getId = (e: FormEvent<HTMLFormElement>) => {
  const form = e.currentTarget;
  const elements = form.elements as Form;
  return elements?.id.value.trim();
};

const initialValue: Context = {
  onSubmit: () => null,
};

const Context = createContext<Context>(initialValue);

const SubmitProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { setProfile, setStatus, setData } = useData();
  const { controller, abort } = useAbortController();
  const popupRef = useRef<DataLoadingPopupHandle>(null);

  const onProgress = useCallback((data: PlatinumProgressData) => {
    const current = data?.current || 0;
    const total = data?.total || 0;
    popupRef.current?.setPages({ current, total });
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const id = getId(e);
      let expires: string | null = null;

      try {
        if (id.length === 0) throw new Error(errors.empty);

        setStatus("profile-loading");
        posthog.capture("submit-profile", { id });
        controller.current = new AbortController();

        const { profile, expires: profileExpires } = await API.getProfile(
          { id },
          { signal: controller.current.signal },
        );
        if (!profile) throw new Error(errors.fetch);
        if (profileExpires) expires = profileExpires;
        setProfile(profile);

        setStatus("platinums-loading");
        posthog.capture("submit-platinums", { id, expires });

        const list = await API.getPlatinums({ id, onProgress });

        const count = list.length;
        setData(list);
        setStatus("completed");
        showExpiresToast(expires);

        popupRef.current?.reset();
        posthog.capture("submit-complete", { id, count, expires });
      } catch (error) {
        console.error("submit error", error);

        setStatus("idle");

        const message = readError(error);
        toast.error(message);

        popupRef.current?.reset();
        posthog.capture("submit-error", { id, message });
      }
    },
    [setStatus, controller, setProfile, onProgress, setData],
  );

  const exposed: Context = useMemo(() => ({ onSubmit }), [onSubmit]);

  return (
    <Context.Provider value={exposed}>
      {children}
      <DataLoadingPopup ref={popupRef} handleAbort={abort} />
    </Context.Provider>
  );
};

export const useSubmit = (): Context => useContext(Context);

export default SubmitProvider;
