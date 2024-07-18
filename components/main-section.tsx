"use client";

import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import { useData } from "@/providers/DataProvider";
import { fetchPlatinums, fetchProfile } from "@/utils/fetch";
import type { FormEventHandler } from "react";
import { useCallback, type FC } from "react";
import OGCalendar from "@/components/og-calendar";
import { groupPlatinumList } from "@/utils/trophies";

interface Form {
  id: { value: string };
}

const MainSection: FC = () => {
  const { profile, platinums, setProfile, setPlatinums } = useData();

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
        const grouped = groupPlatinumList(list);
        setPlatinums(grouped);
      } catch (error) {
        // TODO: handle errors
        console.info("error", error);
      }
    },
    [setProfile, setPlatinums],
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="w-[500px]" onSubmit={handleSubmit}>
        <input
          name="id"
          className="w-[500px] block text-sm rounded-md py-2 pl-3 ring-1 ring-inset bg-zinc-900 ring-zinc-800 placeholder:text-zinc-600 focus:ring-1 focus:ring-inset focus:ring-zinc-600"
          placeholder="Enter your PSN ID"
        />
      </form>
      <div className="mt-6">
        <OGCalendar />
      </div>
      <div className="flex gap-6 mt-6">
        <div className="w-[500px] overflow-auto max-h-80 mt-6">
          <pre className="text-[9px] whitespace-pre-wrap">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
        <div className="w-[500px] overflow-auto max-h-80 mt-6">
          <pre className="text-[9px] whitespace-pre-wrap">
            {JSON.stringify(platinums, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
