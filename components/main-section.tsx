"use client";

import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import { useData } from "@/providers/data";
import type { KeyboardEventHandler } from "react";
import { useCallback, useRef, useState, type FC } from "react";
import OGCalendar from "@/components/og-calendar";
import { groupPlatinumList } from "@/utils/trophies";
import { fetchAPI } from "@/utils/api";
import type { ProfileResponse } from "@/models/profile";
import type { DataLoadingPopupHandle } from "@/components/data-loading-popup";
import DataLoadingPopup from "@/components/data-loading-popup";
import DateDetailsModal from "@/components/date-details-modal";
import type { DateDetailsState } from "@/components/date-details-modal";
import type { DayClickHandler } from "@/models/calendar";
import YearFilter from "@/components/year-filter";

const MainSection: FC = () => {
  const { setProfile, setStatus, setPlatinums, setGroups } = useData();
  const popupRef = useRef<DataLoadingPopupHandle>(null);
  const controller = useRef<AbortController | null>(null);
  const [details, setDetails] = useState<DateDetailsState>({
    isVisible: false,
    details: null,
  });

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const id = e.currentTarget.value;
      try {
        setStatus("profile-loading");
        controller.current = new AbortController();
        const { profile } = await fetchAPI<ProfileResponse>(
          "/profile",
          { id },
          controller.current.signal,
        );
        if (!profile) {
          // TODO: handle errors
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
          const response = await fetchAPI<PlatinumsResponse>(
            "/platinums",
            { id, page: i },
            controller.current.signal,
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
        // TODO: handle errors
        setStatus("idle");
        popupRef.current?.reset();
        console.info("error", error);
      }
    },
    [setProfile, setStatus, setGroups, setPlatinums],
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

  const handleDayClick: DayClickHandler = useCallback((details) => {
    setDetails({ isVisible: true, details });
  }, []);

  const handleDetailsClose = useCallback(() => {
    setDetails((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex h-9 items-center gap-2">
        <input
          className="w-96 h-full block text-sm rounded-md py-2 pl-3 border border-border bg-surface placeholder:text-placeholder focus:border-focus"
          placeholder="Enter your PSN ID"
          onKeyDown={handleKeyDown}
        />
        <YearFilter />
      </div>
      <div className="mt-6 relative">
        <DataLoadingPopup ref={popupRef} handleAbort={handleAbort} />
        <OGCalendar onDayClick={handleDayClick} />
        <DateDetailsModal
          details={details.details}
          isVisible={details.isVisible}
          onClose={handleDetailsClose}
        />
      </div>
    </div>
  );
};

export default MainSection;
