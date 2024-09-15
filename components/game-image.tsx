import type { FC } from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type Props = ImageProps;

const GameImage: FC<Props> = (props) => {
  const { className, src, alt, ...rest } = props;
  return (
    <div
      className={twMerge(
        "relative flex justify-center rounded-md h-9 w-auto aspect-[20/11] overflow-hidden",
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
      <div className="z-[2] absolute size-full bg-black/30" />
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
