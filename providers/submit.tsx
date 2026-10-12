"use client";

import type { DataLoadingPopupHandle } from "@/components/data-loading-popup";
import DataLoadingPopup from "@/components/data-loading-popup";
import { useAbortController } from "@/hooks/use-abort-controller";
import { useData } from "@/providers/data";
import { API } from "@/utils/api";
import { showExpiresToast } from "@/utils/toast";
import { TrophyScoutError } from "@hartaithan/trophy-scout";
import type { PlatinumProgressData } from "@hartaithan/trophy-scout/types";
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
  const { abort, getSignal } = useAbortController();
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
      if (id.length === 0) {
        toast.error(errors.empty);
        return;
      }

      const flow = API.flow("fetch", {
        psn_id: id,
        data: "platinums",
        trigger: "form",
      });
      const signal = getSignal();

      try {
        setStatus("profile-loading");
        const { profile } = await API.getProfile({ id, signal, flow });
        if (!profile) throw new TrophyScoutError(errors.fetch);
        setProfile(profile);

        setStatus("platinums-loading");
        const { list, counts, expires } = await API.getPlatinums({
          id,
          onProgress,
          signal,
          flow,
        });
        setData(list);
        setStatus("completed");
        showExpiresToast(expires);

        flow.complete({
          platinum_count: counts.platinum,
          complete_count: counts.complete,
          total_count: counts.total,
        });
      } catch (error) {
        setStatus("idle");
        if (flow.fail(error) === "failed") {
          toast.error(API.getErrorMessage(error));
        }
      } finally {
        popupRef.current?.reset();
      }
    },
    [setStatus, getSignal, setProfile, onProgress, setData],
  );

  const exposed: Context = useMemo(() => ({ onSubmit }), [onSubmit]);

  return (
    <Context.Provider value={exposed}>
      {children}
      <DataLoadingPopup ref={popupRef} abort={abort} />
    </Context.Provider>
  );
};

export const useSubmit = (): Context => useContext(Context);

export default SubmitProvider;
