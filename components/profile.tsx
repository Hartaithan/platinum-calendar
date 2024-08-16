"use client";

import IconTrophy from "@/icons/trophy";
import type { TrophyTypeAll } from "@/models/trophy";
import { useData } from "@/providers/data";
import Image from "next/image";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

const trophyColors: Record<TrophyTypeAll | string, [string, string]> = {
  total: ["fill-[#27272a]", "text-[#27272a]"],
  platinum: ["fill-[#7a96d1]", "text-[#7a96d1]"],
  gold: ["fill-[#cd9a46]", "text-[#cd9a46]"],
  silver: ["fill-[#9b9b9b]", "text-[#9b9b9b]"],
  bronze: ["fill-[#bf6a3a]", "text-[#bf6a3a]"],
};

const EmptyProfile: FC = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center h-[50px] mb-4">
      <h1 className="font-medium leading-[normal]">
        Enter your PSN ID to create your personalized Platinum Trophy Calendar!
      </h1>
      <p className="text-sm">
        Just make sure your profile is up-to-date on PSNProfiles before you
        start!
      </p>
    </div>
  );
};

const Profile: FC = () => {
  const { profile } = useData();
  if (!profile) return <EmptyProfile />;
  const { avatar_url, name, level, counts } = profile;
  return (
    <div className="flex mb-4">
      <Image
        className="rounded-full"
        width={50}
        height={50}
        src={avatar_url}
        alt={name}
        unoptimized
      />
      <div className="ml-3 flex flex-col justify-center">
        <h1 className="font-medium leading-[normal]">{name}</h1>
        <p className="leading-[normal]">Level: {level.value}</p>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {Object.entries(counts).map(([key, value]) => (
          <div key={key} className="flex gap-2 items-center">
            <IconTrophy className={twMerge("size-5", trophyColors[key][0])} />
            <p className={twMerge("text-sm font-medium", trophyColors[key][1])}>
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
