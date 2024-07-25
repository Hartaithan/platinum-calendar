"use client";

import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import { useData } from "@/providers/data";
import { fetchPlatinums, fetchProfile } from "@/utils/fetch";
import type { FormEventHandler } from "react";
import { useCallback, type FC } from "react";
import OGCalendar from "@/components/og-calendar";
import { groupPlatinumList } from "@/utils/trophies";

interface Form {
  id: { value: string };
}

const MainSection: FC = () => {
  const { profile, platinums, groups, setProfile, setGroups, setPlatinums } =
    useData();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const target = e.target as typeof e.target & Form;
      const id = target.id.value;
      try {
        const profile = await fetchProfile(id);
        if (!profile) {
          // TODO: handle errors
          return;
        }
        setProfile(profile);
        const pages = Math.ceil(profile.counts.platinum / 50);
        const requests: Promise<PlatinumsResponse | null>[] = [];
        for (let i = 1; i <= pages; i++) requests.push(fetchPlatinums(id, i));
        const responses = await Promise.all(requests);
        let list: Platinum[] = [];
        for (const response of responses) {
          if (response?.list) list = list.concat(response.list);
        }
        const { groups, platinums } = groupPlatinumList(list);
        setGroups(groups);
        setPlatinums(platinums);
      } catch (error) {
        // TODO: handle errors
        console.info("error", error);
      }
    },
    [setProfile, setGroups, setPlatinums],
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
      <div className="mt-6">
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
