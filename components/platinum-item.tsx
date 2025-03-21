"use client";

import GameImage from "@/components/game-image";
import type { Platinum } from "@/models/platinum";
import type { Trophy } from "@/models/trophy";
import { useData } from "@/providers/data";
import Image from "next/image";
import type { FC } from "react";

interface PlatinumsProps {
  platinum: Platinum | undefined;
}

const GameItem: FC<PlatinumsProps> = (props) => {
  const { platinum } = props;
  if (!platinum) return null;
  return (
    <div className="flex items-center gap-3 text-left md:gap-4">
      <GameImage src={platinum?.image_url} alt={platinum?.title} />
      <h1 className="text-sm font-medium md:text-base">{platinum?.title}</h1>
    </div>
  );
};

interface TrophyProps {
  trophy: Trophy | undefined;
}

const TrophyItem: FC<TrophyProps> = (props) => {
  const { trophy } = props;
  if (!trophy) return null;
  return (
    <div className="flex items-center gap-4 text-left">
      <Image
        className="image-shadow h-auto min-w-12 rounded-md"
        width={48}
        height={48}
        alt={trophy?.title ?? "Unknown"}
        src={trophy?.image_url ?? ""}
        unoptimized
      />
      <div>
        <h3 className="text-sm font-semibold md:text-lg">{trophy?.title}</h3>
        <p className="text-xs md:text-sm">{trophy?.description}</p>
      </div>
    </div>
  );
};

const TrophyStats: FC<PlatinumsProps> = (props) => {
  const { platinum } = props;
  if (!platinum) return null;
  const trophy = platinum?.trophy || null;
  return (
    <div className="flex flex-col gap-2 text-left text-sm md:text-base">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {platinum?.completion && (
          <div>
            <span className="font-medium">Type:&nbsp;</span>
            <span className="capitalize">{platinum.completion}</span>
          </div>
        )}
        <div>
          <span className="font-medium">Progress:&nbsp;</span>
          <span>{platinum?.progress?.toLocaleString() ?? "Unknown"}%</span>
        </div>
        {platinum?.platforms?.length > 0 && (
          <div>
            <span className="font-medium">Platform:&nbsp;</span>
            <span>{platinum.platforms.join(", ")}</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {trophy?.rarity_label && (
          <div>
            <span className="font-medium capitalize">
              {trophy?.rarity_label}:&nbsp;
            </span>
            <span>{trophy?.earned_rate?.toLocaleString() ?? "Unknown"}%</span>
          </div>
        )}
        {trophy?.earned_at && (
          <div>
            <span className="font-medium">Earned:&nbsp;</span>
            <span>{new Date(trophy.earned_at).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface Props {
  platinumId: string;
}

const PlatinumItem: FC<Props> = (props) => {
  const { platinumId: key } = props;
  const { games } = useData();
  const platinum = games ? games[key] : null;
  if (!platinum) return null;
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-input/25 p-3 text-card-foreground shadow-sm">
      <TrophyItem trophy={platinum.trophy} />
      <TrophyStats platinum={platinum} />
      <GameItem platinum={platinum} />
    </div>
  );
};

export default PlatinumItem;
