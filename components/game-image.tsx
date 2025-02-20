import type { ImageProps } from "next/image";
import Image from "next/image";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = ImageProps;

const GameImage: FC<Props> = (props) => {
  const { className, src, alt, ...rest } = props;
  return (
    <div
      className={twMerge(
        "relative flex aspect-[20/11] h-9 w-auto flex-shrink-0 justify-center overflow-hidden rounded-md",
        className,
      )}>
      <Image
        className="relative z-[3] h-full w-auto drop-shadow-md"
        src={src}
        alt={alt}
        {...rest}
        width="0"
        height="0"
        unoptimized
      />
      <div className="absolute z-[2] size-full bg-black/30" />
      <Image
        className="z-[1] object-cover blur"
        src={src}
        alt={`${alt} background`}
        {...rest}
        fill
        unoptimized
      />
    </div>
  );
};

export default GameImage;
