"use client";

import type { TrophyTypeAll } from "@/models/trophy";
import { useData } from "@/providers/data";
import Image from "next/image";
import type { FC } from "react";
import { cn } from "@/utils/styles";
import TrophyIcon from "@/icons/trophy";

const trophyColors: Record<TrophyTypeAll | string, [string, string]> = {
  total: ["fill-[#27272a]", "text-[#27272a]"],
  platinum: ["fill-[#7a96d1]", "text-[#7a96d1]"],
  gold: ["fill-[#cd9a46]", "text-[#cd9a46]"],
  silver: ["fill-[#9b9b9b]", "text-[#9b9b9b]"],
  bronze: ["fill-[#bf6a3a]", "text-[#bf6a3a]"],
};

const EmptyProfile: FC = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center min-h-[50px] mb-4">
      <h1 className="text-sm md:text-base font-medium text-center leading-[normal]">
        Enter your PSN ID to create your personalized Platinum Trophy Calendar!
      </h1>
      <p className="text-xs md:text-sm text-center mt-1 md:mt-0">
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
    <div className="flex flex-col lg:flex-row @save:flex-row justify-between w-full mb-4 gap-3 lg:gap-0 @save:gap-0 items-center lg:items-normal @save:items-normal">
      <div className="flex justify-center lg:justify-normal @save:justify-normal">
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
      </div>
      <div className="w-4/5 md:w-10/12 lg:w-auto @save:w-auto flex items-center justify-center lg:justify-normal @save:justify-normal gap-4 flex-wrap @save:flex-nowrap">
        {Object.entries(counts).map(([key, value]) => (
          <div key={key} className="flex gap-2 items-center">
            <div
              className={cn(
                "size-6 rounded-full flex justify-center items-center",
                trophyColors[key][0],
              )}>
              <TrophyIcon className={cn("size-5", trophyColors[key][0])} />
            </div>
            <p className={cn("text-sm font-medium", trophyColors[key][1])}>
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
