"use client";

import AboutModal from "@/components/about-modal";
import type { DataLoadingPopupHandle } from "@/components/data-loading-popup";
import DataLoadingPopup from "@/components/data-loading-popup";
import HeatMapCalendar from "@/components/heatmap-calendar";
import LinkMessage from "@/components/link-message";
import OGCalendar from "@/components/og-calendar";
import Profile from "@/components/profile";
import SettingsModal from "@/components/settings-modal";
import ShareMenu from "@/components/share-menu";
import SubmitForm from "@/components/submit-form";
import YearFilter from "@/components/year-filter";
import { defaultTheme } from "@/constants/app";
import type { Theme } from "@/models/app";
import type { Platinum } from "@/models/trophy";
import { useData } from "@/providers/data";
import { useSettings } from "@/providers/settings";
import { useTheme } from "@/providers/theme";
import { API } from "@/utils/api";
import { readError } from "@/utils/error";
import { groupPlatinumList } from "@/utils/group";
import { drawImage } from "@/utils/image";
import { showExpiresToast } from "@/utils/toast";
import posthog from "posthog-js";
import type { FormEventHandler } from "react";
import { useCallback, useRef, type FC } from "react";
import { toast } from "sonner";

interface Form extends HTMLFormControlsCollection {
  id: { value: string };
}

const calendars: Record<Theme, FC> = {
  og: OGCalendar,
  heatmap: HeatMapCalendar,
};

const errors = {
  empty: "Enter your PSN ID. This field cannot be empty",
  fetch: "Unable to fetch profile",
};

const MainSection: FC = () => {
  const { setProfile, setStatus, setPlatinums, setGroups } = useData();
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const hiddenRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<DataLoadingPopupHandle>(null);
  const controller = useRef<AbortController | null>(null);
  const {
    settings: { source, link },
  } = useSettings();
  const { theme } = useTheme();
  const Calendar = calendars[theme || defaultTheme];

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const elements = form.elements as Form;
      const id = elements.id.value.trim();
      let list: Platinum[] = [];
      try {
        let expires: string | null = null;
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
        const { groups, platinums } = groupPlatinumList(list);
        setGroups(groups);
        setPlatinums(platinums);
        setStatus("completed");
        showExpiresToast(expires);
        const count = list.length;
        posthog.capture("submit-complete", { id, source, count, expires });
        popupRef.current?.reset();
      } catch (error) {
        console.error("submit error", error);
        const { groups, platinums } = groupPlatinumList(list);
        setGroups(groups);
        setPlatinums(platinums);
        setStatus("idle");
        popupRef.current?.reset();
        const message = readError(error);
        toast.error(message);
        posthog.capture("submit-error", { id, source, message });
      }
    },
    [source, setStatus, setProfile, setGroups, setPlatinums],
  );

  const handleAbort = useCallback(() => {
    if (!controller.current) return;
    controller.current.abort("The user canceled the data download");
    posthog.capture("submit-cancelled");
  }, []);

  const generateImage = useCallback(async (): Promise<Blob | null> => {
    const calendar = calendarRef.current;
    const hidden = hiddenRef.current;
    if (!calendar || !hidden) return null;
    try {
      hidden.innerHTML = "";
      hidden.appendChild(calendar.cloneNode(true));
      const image = await drawImage(hidden);
      if (!image) throw new Error("Unable to generate image");
      hidden.innerHTML = "";
      return image;
    } catch (error) {
      console.error("generate image error", error);
      const message = readError(error);
      toast.error(message);
      return null;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-4/5 flex-col items-center gap-2 lg:w-auto lg:flex-row">
        <SubmitForm onSubmit={handleSubmit} />
        <div className="flex h-auto w-full flex-wrap gap-2 lg:h-9 lg:w-[auto] [&>*]:flex-1">
          <YearFilter />
          <ShareMenu generateImage={generateImage} />
          <AboutModal />
          <SettingsModal />
        </div>
      </div>
      <div
        className="relative flex flex-grow flex-col items-center px-10 py-9"
        ref={calendarRef}>
        <Profile />
        <Calendar />
        {link && <LinkMessage />}
      </div>
      <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden">
        <div
          className="flex h-[800px] w-[1200px] flex-col @container"
          ref={hiddenRef}
        />
      </div>
      <DataLoadingPopup ref={popupRef} handleAbort={handleAbort} />
    </div>
  );
};

export default MainSection;
