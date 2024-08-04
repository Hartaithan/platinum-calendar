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
    <div className="w-full flex items-center pr-2">
      <Image
        className="rounded-md min-w-12"
        width={48}
        height={48}
        alt={platinum.title}
        src={platinum.image_url}
        unoptimized
      />
      <div className="mx-3">
        <h1 className="text-sm font-medium">{platinum.title}</h1>
        <p className="text-xs">{platinum.description}</p>
      </div>
      <div className="flex items-center ml-auto gap-2 text-sm">
        <p className="mr-2">#{platinum.number}</p>
        <div className="flex flex-col justify-center items-center">
          <p className="font-medium">{platinum.achievers}</p>
          <p>Achievers</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-medium">{platinum.owners}</p>
          <p>Owners</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-medium">{platinum.rarity.value}%</p>
          <p className="capitalize">{platinum.rarity.type}</p>
        </div>
      </div>
    </div>
  );
};

export default PlatinumItem;
