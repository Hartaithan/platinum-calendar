"use client";

import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import { useData } from "@/providers/data";
import type { FormEventHandler } from "react";
import { useCallback, useRef, type FC } from "react";
import OGCalendar from "@/components/og-calendar";
import HeatMapCalendar from "@/components/heatmap-calendar";
import { groupPlatinumList } from "@/utils/group";
import { API } from "@/utils/api";
import type { ProfileResponse } from "@/models/profile";
import type { DataLoadingPopupHandle } from "@/components/data-loading-popup";
import DataLoadingPopup from "@/components/data-loading-popup";
import DateDetailsModal from "@/components/date-details-modal";
import type { DetailsModalData } from "@/components/date-details-modal";
import type { CalendarProps, DayClickHandler } from "@/models/calendar";
import YearFilter from "@/components/year-filter";
import Profile from "@/components/profile";
import LinkMessage from "@/components/link-message";
import { readError } from "@/utils/error";
import { toast } from "sonner";
import { drawImage } from "@/utils/image";
import { CircleHelpIcon, SettingsIcon } from "lucide-react";
import SettingsModal from "@/components/settings-modal";
import { useModal } from "@/hooks/use-modal";
import SubmitForm from "@/components/submit-form";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/providers/settings";
import ShareMenu from "@/components/share-menu";
import { useTheme } from "@/providers/theme";
import { defaultTheme } from "@/constants/app";
import AboutModal from "@/components/about-modal";
import type { Theme } from "@/models/app";
import posthog from "posthog-js";
import { blocked } from "@/constants/blocked";

interface Form extends HTMLFormControlsCollection {
  id: { value: string };
}

const calendars: Record<Theme, FC<CalendarProps>> = {
  og: OGCalendar,
  heatmap: HeatMapCalendar,
};

const errors = {
  empty: "Enter your PSN ID. This field cannot be empty",
  fetch: "Unable to fetch profile",
  blocked:
    "The profile is blocked. Please contact us at hartaithan@gmail.com to unlock it",
};

const MainSection: FC = () => {
  const { setProfile, setStatus, setPlatinums, setGroups } = useData();
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const hiddenRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<DataLoadingPopupHandle>(null);
  const controller = useRef<AbortController | null>(null);
  const [details, openDetails, closeDetails] = useModal<DetailsModalData>();
  const [settings, openSettings, closeSettings] = useModal();
  const [about, openAbout, closeAbout] = useModal();
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
      try {
        if (id.length === 0) throw new Error(errors.empty);
        if (blocked[id]) {
          toast.error(errors.blocked, { duration: 20000 });
          posthog.capture("submit-blocked", { id, source });
          return;
        }
        setStatus("profile-loading");
        posthog.capture("submit-profile", { id, source });
        controller.current = new AbortController();
        const { profile } = await API.get<ProfileResponse>(
          "/profile",
          { id, source },
          { signal: controller.current.signal },
        );
        if (!profile) throw new Error(errors.fetch);
        setProfile(profile);
        const pages = Math.ceil(profile.counts.platinum / 50);
        let list: Platinum[] = [];
        popupRef.current?.setPages({ current: 1, total: pages });
        setStatus("platinums-loading");
        posthog.capture("submit-platinums", { id, source });
        for (let i = 1; i <= pages; i++) {
          if (controller.current.signal.aborted) {
            throw new Error(controller.current.signal.reason);
          }
          controller.current = new AbortController();
          const response = await API.get<PlatinumsResponse>(
            "/platinums",
            { id, page: i, source },
            { signal: controller.current.signal },
          );
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
        posthog.capture("submit-complete", { id, source, count: list.length });
        popupRef.current?.reset();
      } catch (error) {
        console.error("submit error", error);
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

  const handleDayClick: DayClickHandler = useCallback(
    (details) => openDetails(details),
    [openDetails],
  );

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
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row w-4/5 lg:w-auto items-center gap-2">
        <SubmitForm onSubmit={handleSubmit} />
        <div className="flex flex-wrap h-auto lg:h-9 w-full lg:w-[auto] gap-2 [&>*]:flex-1">
          <YearFilter />
          <ShareMenu generateImage={generateImage} />
          <Button
            id="about-modal"
            variant="secondary"
            aria-label="Open about modal"
            className="border border-input"
            onClick={openAbout}>
            <CircleHelpIcon className="size-5 stroke-[1.5]" />
          </Button>
          <Button
            id="settings-modal"
            variant="secondary"
            aria-label="Open settings"
            className="border border-input"
            onClick={openSettings}>
            <SettingsIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
      </div>
      <div
        className="flex flex-grow flex-col items-center relative px-10 py-9"
        ref={calendarRef}>
        <Profile />
        <Calendar onDayClick={handleDayClick} />
        {link && <LinkMessage />}
      </div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-50">
        <div
          className="flex flex-col w-[1200px] h-[800px] @container"
          ref={hiddenRef}
        />
      </div>
      <DataLoadingPopup ref={popupRef} handleAbort={handleAbort} />
      <DateDetailsModal
        data={details.data}
        isVisible={details.isVisible}
        onClose={closeDetails}
      />
      <SettingsModal isVisible={settings.isVisible} onClose={closeSettings} />
      <AboutModal isVisible={about.isVisible} onClose={closeAbout} />
    </div>
  );
};

export default MainSection;
