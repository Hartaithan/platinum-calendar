"use client";

import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import { useData } from "@/providers/data";
import type { FormEventHandler } from "react";
import { useCallback, useRef, useState, type FC } from "react";
import OGCalendar from "@/components/og-calendar";
import { groupPlatinumList } from "@/utils/trophies";
import Spinner from "@/components/spinner";
import IconCircleCheck from "@/icons/circle-check";
import type { Pages } from "@/models/app";
import { fetchAPI } from "@/utils/api";
import type { ProfileResponse } from "@/models/profile";

interface Form {
  id: { value: string };
}

const defaultPages: Pages = { current: 0, total: 10 };

const MainSection: FC = () => {
  const { setProfile, status, setStatus, setPlatinums, setGroups } = useData();
  const [pages, setPages] = useState<Pages>(defaultPages);
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
        setPages({ current: 1, total: pages });
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
          setPages((prev) => ({
            ...prev,
            current: response?.next_page ?? prev.current,
          }));
        }
        const { groups, platinums } = groupPlatinumList(list);
        setGroups(groups);
        setPlatinums(platinums);
        setStatus("completed");
        setPages(defaultPages);
      } catch (error) {
        // TODO: handle errors
        setStatus("idle");
        setPages(defaultPages);
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
        {(status === "platinums-loading" || status === "profile-loading") && (
          <div className="w-[240px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background shadow-2xl px-6 py-4 text-text z-10">
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
        )}
        <OGCalendar />
      </div>
    </div>
  );
};

export default MainSection;
