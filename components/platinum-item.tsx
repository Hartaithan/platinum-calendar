"use client";

import type { FC } from "react";
import { useData } from "@/providers/data";
import Image from "next/image";
import GameImage from "@/components/game-image";

interface Props {
  platinumId: string;
}

const PlatinumItem: FC<Props> = (props) => {
  const { platinumId: key } = props;
  const { platinums } = useData();
  const platinum = platinums ? platinums[key] : null;
  if (!platinum) return null;
  return (
    <div className="flex flex-col rounded-lg border border-input/25 text-card-foreground shadow-sm w-full p-3 gap-3">
      <div className="flex items-center gap-4 text-left">
        <Image
          className="rounded-md min-w-12 h-auto"
          width={48}
          height={48}
          alt={platinum.title}
          src={platinum.image_url}
          unoptimized
        />
        <div>
          <h3 className="text-sm md:text-lg font-semibold">{platinum.title}</h3>
          <p className="text-xs md:text-sm">{platinum.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-sm md:text-base text-left">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <div>
            <span>#{platinum.number}</span>
          </div>
          <div>
            <span className="font-medium">Earned:&nbsp;</span>
            <span>{new Date(platinum.date).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <div>
            <span className="font-medium capitalize">
              {platinum.rarity.type}:&nbsp;
            </span>
            <span>{platinum.rarity.value}%</span>
          </div>
          <div>
            <span className="font-medium">Achievers:&nbsp;</span>
            <span>{platinum.achievers.toLocaleString()}</span>
          </div>
          <div>
            <span className="font-medium">Owners:&nbsp;</span>
            <span>{platinum.owners.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4 text-left">
        <GameImage src={platinum.game.image_url} alt={platinum.game.title} />
        <h1 className="text-sm md:text-base font-medium">
          {platinum.game.title}
        </h1>
      </div>
    </div>
  );
};

export default PlatinumItem;
