"use client";

import CalendarProgress from "@/components/calendar-progress";
import TrophyIcon from "@/icons/trophy";
import type { Profile as ProfileInfo } from "@/models/profile";
import { useData } from "@/providers/data";
import { getProxyURL } from "@/utils/image";
import { cn } from "@/utils/styles";
import Image from "next/image";
import { memo, type FC } from "react";

const EmptyProfile: FC = () => {
  return (
    <div className="mb-4 flex min-h-[50px] flex-1 flex-col items-center justify-center">
      <h1 className="text-center text-sm font-medium leading-[normal] md:text-base">
        Enter your PSN ID to create your personalized Platinum Trophy Calendar!
      </h1>
      <p className="mt-1 text-center text-xs md:mt-0 md:text-sm">
        Just make sure your PSN profile is set to public so your trophy data can
        be accessed!
      </p>
    </div>
  );
};

type InfoProps = Pick<ProfileInfo, "avatar_url" | "name" | "level">;

const Info: FC<InfoProps> = memo((props) => {
  const { avatar_url, name, level } = props;
  const image_url = getProxyURL(avatar_url);
  return (
    <div className="flex justify-center @save:!justify-normal lg:justify-normal">
      <Image
        className="image-shadow rounded-full"
        width={50}
        height={50}
        src={image_url}
        alt={name}
        unoptimized
      />
      <div className="ml-3 flex flex-col justify-center">
        <h1 className="font-medium leading-[normal]">{name}</h1>
        <p className="leading-[normal]">Level: {level.toLocaleString()}</p>
      </div>
    </div>
  );
});

type CountsProps = Pick<ProfileInfo, "counts">;

const Counts: FC<CountsProps> = memo((props) => {
  const { counts } = props;
  return (
    <div className="ml-[none] flex w-4/5 flex-wrap items-center justify-center gap-x-4 gap-y-2 @save:!ml-auto @save:!w-auto @save:!flex-nowrap @save:!justify-normal md:w-10/12 lg:ml-auto lg:w-auto lg:justify-normal">
      {Object.entries(counts).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <div
            className={cn(
              "flex size-6 items-center justify-center rounded-full",
              `trophy-${key}`,
            )}>
            <TrophyIcon
              className={cn("size-5", `trophy-${key}`)}
              total={key === "total"}
            />
          </div>
          <p className={cn("text-sm font-medium", `trophy-${key}`)}>
            {value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
});

const Profile: FC = () => {
  const { profile } = useData();
  if (!profile || Object.keys(profile).length === 0) return <EmptyProfile />;
  const { avatar_url, name, level, counts } = profile;
  return (
    <div className="lg:items-normal @save:!items-normal mb-4 flex w-full flex-col items-center gap-3 @save:!flex-row @save:!gap-0 lg:flex-row lg:gap-0">
      <Info avatar_url={avatar_url} name={name} level={level} />
      <CalendarProgress />
      <Counts counts={counts} />
    </div>
  );
};

export default Profile;
