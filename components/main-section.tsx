"use client";

import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import { useData } from "@/providers/data";
import type { FormEventHandler } from "react";
import { useCallback, useRef, type FC } from "react";
import OGCalendar from "@/components/og-calendar";
import { groupPlatinumList } from "@/utils/trophies";
import { fetchAPI } from "@/utils/api";
import type { ProfileResponse } from "@/models/profile";
import type { DataLoadingPopupHandle } from "@/components/data-loading-popup";
import DataLoadingPopup from "@/components/data-loading-popup";

interface Form {
  id: { value: string };
}

const MainSection: FC = () => {
  const { setProfile, setStatus, setPlatinums, setGroups } = useData();
  const popupRef = useRef<DataLoadingPopupHandle>(null);
  const controller = useRef<AbortController | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const target = e.target as typeof e.target & Form;
      const id = target.id.value;
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

  const handleAbort = useCallback(() => {
    if (!controller.current) return;
    controller.current.abort("The loading has been canceled by the user");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="w-[500px]" onSubmit={handleSubmit}>
        <input
          name="id"
          className="w-[500px] block text-sm rounded-md py-2 pl-3 ring-1 ring-inset bg-surface ring-border placeholder:text-placeholder focus:ring-1 focus:ring-inset focus:ring-focus"
          placeholder="Enter your PSN ID"
        />
      </form>
      <div className="mt-6 relative">
        <DataLoadingPopup ref={popupRef} handleAbort={handleAbort} />
        <OGCalendar />
      </div>
    </div>
  );
};

export default MainSection;
