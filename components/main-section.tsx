"use client";

import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import { useData } from "@/providers/data";
import type { FormEventHandler } from "react";
import { useCallback, useState, type FC } from "react";
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
  const {
    profile,
    setProfile,
    status,
    setStatus,
    platinums,
    setPlatinums,
    groups,
    setGroups,
  } = useData();
  const [pages, setPages] = useState<Pages>(defaultPages);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const target = e.target as typeof e.target & Form;
      const id = target.id.value;
      try {
        setStatus("profile-loading");
        const { profile } = await fetchAPI<ProfileResponse>("/profile", { id });
        if (!profile) {
          // TODO: handle errors
          setStatus("idle");
          return;
        }
        setProfile(profile);
        const pages = Math.ceil(profile.counts.platinum / 50);
        const requests: Promise<PlatinumsResponse>[] = [];
        for (let i = 1; i <= pages; i++)
          requests.push(fetchAPI("/platinums", { id, page: i }));
        setPages({ current: 1, total: pages });
        setStatus("platinums-loading");
        let list: Platinum[] = [];
        for (const request of requests) {
          const response = await request;
          if (!response.list) continue;
          list = list.concat(response.list);
          setPages((prev) => ({
            ...prev,
            current:
              prev.current === prev.total ? prev.current : prev.current + 1,
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
        console.info("error", error);
      }
    },
    [setProfile, setStatus, setGroups, setPlatinums],
  );

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
          </div>
        )}
        <OGCalendar />
      </div>
      <div className="w-[350px] absolute inset-y-1/2 -translate-y-1/2 left-4 overflow-auto h-[500px]">
        <pre className="text-[9px] whitespace-pre-wrap">
          profile: {JSON.stringify(profile, null, 2)}
        </pre>
      </div>
      <div className="w-[350px] absolute inset-y-1/2 -translate-y-1/2 right-4 overflow-auto h-[90%]">
        <pre className="text-[9px] whitespace-pre-wrap">
          groups: {JSON.stringify(groups, null, 2)}
        </pre>
        <pre className="text-[9px] whitespace-pre-wrap">
          platinums: {JSON.stringify(platinums, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default MainSection;
