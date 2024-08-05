import { useData } from "@/providers/data";
import Image from "next/image";
import type { FC } from "react";

interface Props {
  platKey: string;
}

const PlatinumItem: FC<Props> = (props) => {
  const { platinums } = useData();
  const { platKey } = props;
  const platinum = platinums ? platinums[platKey] : null;
  if (!platinum) return null;
  return (
    <div className="flex flex-col rounded-lg border border-border/25 text-card-foreground shadow-sm w-full p-3 gap-3">
      <div className="flex items-center gap-4">
        <Image
          className="rounded-md min-w-12 h-auto"
          width={48}
          height={48}
          alt={platinum.title}
          src={platinum.image_url}
          unoptimized
        />
        <div>
          <h3 className="text-lg font-semibold">{platinum.title}</h3>
          <p className="text-sm">{platinum.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-medium">Earned:&nbsp;</span>
          <span>{new Date(platinum.date).toLocaleString()}</span>
        </div>
        <div className="flex gap-4">
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
      <div className="flex items-center gap-4">
        <Image
          className="rounded-md min-w-9 h-9 w-auto"
          width={36}
          height={36}
          alt={platinum.game.title}
          src={platinum.game.image_url}
          unoptimized
        />
        <h1 className="text-md font-medium">{platinum.game.title}</h1>
      </div>
    </div>
  );
};

export default PlatinumItem;
