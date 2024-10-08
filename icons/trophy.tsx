import { cn } from "@/utils/styles";
import type { ComponentPropsWithoutRef, FC } from "react";

interface Props extends ComponentPropsWithoutRef<"svg"> {
  total?: boolean;
}

const Icon: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="-1 0 20 20"
      fillRule="nonzero"
      {...props}>
      <path d="M13.675 4.5H6.227l.635 4.418c1.222 2.623 4.956 2.623 6.178 0l.635-4.418zM6.227 2.5a2 2 0 00-1.98 2.285l.64 4.446c.024.17.073.336.144.492 1.925 4.216 7.915 4.216 9.84 0 .071-.156.12-.322.144-.492l.64-4.446a2 2 0 00-1.98-2.285H6.227z" />
      <path d="M8.95 15.5v-3h2v3h-2z" />
      <path d="M8.058 16.5a2.778 2.778 0 013.786 0H8.058z" />
      <path d="M12.968 15.5a4.277 4.277 0 00-6.033 0l-.796.791c-.632.63-.187 1.709.706 1.709h6.212c.893 0 1.338-1.08.706-1.709l-.796-.791z" />
      <path d="M5.421 5.5a1 1 0 01-1 1h-2.01a1 1 0 110-2h2.01a1 1 0 011 1z" />
      <path d="M2.268 4.512a1.003 1.003 0 011.135.848l.07.489a3.165 3.165 0 002.62 2.667l-.328 1.968a5.168 5.168 0 01-4.277-4.356l-.07-.488a.997.997 0 01.85-1.128zM14.579 5.5a1 1 0 001 1h2.01a1 1 0 100-2h-2.01a1 1 0 00-1 1z" />
      <path d="M17.732 4.512a1.003 1.003 0 00-1.135.848l-.07.489a3.166 3.166 0 01-2.62 2.667l.328 1.968a5.168 5.168 0 004.277-4.356l.07-.488a.997.997 0 00-.85-1.128z" />
    </svg>
  );
};

const TrophyIcon: FC<Props> = (props) => {
  const { total = false, className, ...rest } = props;
  if (!total) return <Icon className={className} {...rest} />;
  return (
    <div className="relative">
      <Icon
        className={cn(className, "absolute top-0 -left-1.5 scale-75")}
        {...rest}
      />
      <Icon className={className} {...rest} />
      <Icon
        className={cn(className, "absolute top-0 -right-1.5 scale-75")}
        {...rest}
      />
    </div>
  );
};

export default TrophyIcon;
