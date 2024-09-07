"use client";

import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import { useData } from "@/providers/data";
import type { KeyboardEventHandler } from "react";
import { useCallback, useRef, type FC } from "react";
import OGCalendar from "@/components/og-calendar";
import { groupPlatinumList } from "@/utils/trophies";
import { fetchAPI } from "@/utils/api";
import type { ProfileResponse } from "@/models/profile";
import type { DataLoadingPopupHandle } from "@/components/data-loading-popup";
import DataLoadingPopup from "@/components/data-loading-popup";
import DateDetailsModal from "@/components/modals/date-details-modal";
import type { DetailsModalData } from "@/components/modals/date-details-modal";
import type { DayClickHandler } from "@/models/calendar";
import YearFilter from "@/components/year-filter";
import IconDeviceFloppy from "@/icons/device-floppy";
import { toBlob } from "html-to-image";
import Profile from "@/components/profile";
import LinkMessage from "@/components/link-message";
import ImageUploadPopup from "@/components/image-upload-popup";
import { readError } from "@/utils/error";
import { useErrors } from "@/providers/errors";
import { imageOptions } from "@/constants/image";
import IconSettings from "@/icons/settings";
import SettingsModal from "@/components/modals/settings-modal";
import { useModal } from "@/hooks/use-modal";
import { Input } from "@/components/ui/input";

const MainSection: FC = () => {
  const { profile, setProfile, setStatus, setPlatinums, setGroups } = useData();
  const { addError } = useErrors();
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const hiddenRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<DataLoadingPopupHandle>(null);
  const controller = useRef<AbortController | null>(null);
  const [details, openDetails, closeDetails] = useModal<DetailsModalData>();
  const [settings, openSettings, closeSettings] = useModal();

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const id = e.currentTarget.value;
      try {
        setStatus("profile-loading");
        controller.current = new AbortController();
        const { profile } = await fetchAPI.get<ProfileResponse>(
          "/profile",
          { id },
          { signal: controller.current.signal },
        );
        if (!profile) {
          addError("Unable to fetch profile");
          setStatus("idle");
          return;
        }
        setProfile(profile);
        const pages = Math.ceil(profile.counts.platinum / 50);
        let list: Platinum[] = [];
        popupRef.current?.setPages({ current: 1, total: pages });
        setStatus("platinums-loading");
        for (let i = 1; i <= pages; i++) {
          if (controller.current.signal.aborted) {
            throw new Error("The data loading has been canceled");
          }
          controller.current = new AbortController();
          const response = await fetchAPI.get<PlatinumsResponse>(
            "/platinums",
            { id, page: i },
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
        popupRef.current?.reset();
      } catch (error) {
        console.error("submit error", error);
        setStatus("idle");
        popupRef.current?.reset();
        const message = readError(error);
        addError(message);
      }
    },
    [setProfile, setStatus, setGroups, setPlatinums, addError],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === "Enter") handleSubmit(e);
    },
    [handleSubmit],
  );

  const handleAbort = useCallback(() => {
    if (!controller.current) return;
    controller.current.abort("The loading has been canceled by the user");
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
      const image = await toBlob(hidden, imageOptions);
      if (!image) throw new Error("Unable to generate image");
      hidden.innerHTML = "";
      return image;
    } catch (error) {
      console.error("generate image error", error);
      const message = readError(error);
      addError(message);
      return null;
    }
  }, [addError]);

  const handleSave = useCallback(async () => {
    try {
      const image = await generateImage();
      if (!image) throw new Error("Unable to generate image");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(image);
      link.download = `${profile?.name ?? "calendar"}.png`;
      link.click();
      link.remove();
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      addError(message);
    }
  }, [profile?.name, generateImage, addError]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row w-4/5 lg:w-auto items-center gap-2">
        <Input
          className="w-full lg:w-96 h-9"
          placeholder="Enter your PSN ID"
          onKeyDown={handleKeyDown}
        />
        <div className="flex h-9 gap-2">
          <YearFilter />
          <button
            className="flex items-center relative h-full rounded-md py-2 px-3 border border-input bg-surface"
            onClick={handleSave}>
            <IconDeviceFloppy className="size-5 stroke-1" />
          </button>
          <ImageUploadPopup generateImage={generateImage} />
          <button
            className="flex items-center relative h-full rounded-md py-2 px-3 border border-input bg-surface"
            onClick={openSettings}>
            <IconSettings className="size-5 stroke-[1.5]" />
          </button>
        </div>
      </div>
      <div
        className="flex flex-col items-center relative bg-background py-9 pl-9 pr-9 lg:pr-24"
        ref={calendarRef}>
        <Profile />
        <OGCalendar onDayClick={handleDayClick} />
        <DataLoadingPopup ref={popupRef} handleAbort={handleAbort} />
        <LinkMessage />
      </div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-50">
        <div className="w-[1200px] h-[800px] @container" ref={hiddenRef} />
      </div>
      <DateDetailsModal
        data={details.data}
        isVisible={details.isVisible}
        onClose={closeDetails}
      />
      <SettingsModal isVisible={settings.isVisible} onClose={closeSettings} />
    </div>
  );
};

export default MainSection;
