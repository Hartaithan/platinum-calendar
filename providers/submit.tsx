"use client";

import type { DataLoadingPopupHandle } from "@/components/data-loading-popup";
import DataLoadingPopup from "@/components/data-loading-popup";
import { useAbortController } from "@/hooks/use-abort-controller";
import type {
  NullableGroupedPlatinums,
  NullableGroupedPlatinumsKeys,
  Platinum,
} from "@/models/trophy";
import { useData } from "@/providers/data";
import { useSettings } from "@/providers/settings";
import { API } from "@/utils/api";
import { readError } from "@/utils/error";
import { groupPlatinumList } from "@/utils/group";
import { showExpiresToast } from "@/utils/toast";
import posthog from "posthog-js";
import type {
  Dispatch,
  FC,
  FormEvent,
  FormEventHandler,
  PropsWithChildren,
  SetStateAction,
} from "react";
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

const setPlatinumList = (
  list: Platinum[],
  setGroups: Dispatch<SetStateAction<NullableGroupedPlatinumsKeys>>,
  setPlatinums: Dispatch<SetStateAction<NullableGroupedPlatinums>>,
) => {
  if (list.length === 0) return;
  const { groups, platinums } = groupPlatinumList(list);
  setGroups(groups);
  setPlatinums(platinums);
};

const initialValue: Context = {
  onSubmit: () => null,
};

const Context = createContext<Context>(initialValue);

const SubmitProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { setProfile, setStatus, setPlatinums, setGroups } = useData();
  const { controller, abort } = useAbortController();
  const {
    settings: { source },
  } = useSettings();
  const popupRef = useRef<DataLoadingPopupHandle>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const id = getId(e);
      let list: Platinum[] = [];
      let expires: string | null = null;

      try {
        if (id.length === 0) throw new Error(errors.empty);

        setStatus("profile-loading");
        posthog.capture("submit-profile", { id, source });
        controller.current = new AbortController();

        const { profile, expires: profileExpires } = await API.getProfile(
          { id, source },
          { signal: controller.current.signal },
        );
        if (!profile) throw new Error(errors.fetch);
        if (profileExpires) expires = profileExpires;
        setProfile(profile);

        const pages = Math.ceil(profile.counts.platinum / 50);
        popupRef.current?.setPages({ current: 1, total: pages });

        setStatus("platinums-loading");
        posthog.capture("submit-platinums", { id, source, expires });

        for (let i = 1; i <= pages; i++) {
          if (controller.current.signal.aborted) {
            throw new Error(controller.current.signal.reason);
          }
          controller.current = new AbortController();
          const response = await API.getPlatinums(
            { id, source, page: i },
            { signal: controller.current.signal },
          );
          if (response.expires) expires = response.expires;
          if (!response.list) continue;
          list = list.concat(response.list);
          popupRef.current?.setPages((prev) => ({
            ...prev,
            current: response?.next_page ?? prev.current,
          }));
        }

        const count = list.length;
        setPlatinumList(list, setGroups, setPlatinums);
        setStatus("completed");
        showExpiresToast(expires);

        popupRef.current?.reset();
        posthog.capture("submit-complete", { id, source, count, expires });
      } catch (error) {
        console.error("submit error", error);

        setPlatinumList(list, setGroups, setPlatinums);
        setStatus("idle");

        const message = readError(error);
        toast.error(message);

        popupRef.current?.reset();
        posthog.capture("submit-error", { id, source, message });
      }
    },
    [source, controller, setStatus, setProfile, setGroups, setPlatinums],
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
