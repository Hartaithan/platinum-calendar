import type { ComponentPropsWithoutRef, FC } from "react";
import { useDisclosure } from "@/hooks/use-disclosure";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentPropsWithoutRef<"div"> {
  content: string;
}

const Popover: FC<Props> = (props) => {
  const { content, className, children, ...rest } = props;
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div
      className={twMerge("relative inline-block size-full", className)}
      onMouseEnter={open}
      onMouseLeave={close}
      {...rest}>
      {children}
      {opened && (
        <div className="absolute -top-full left-[50%] -translate-x-[50%] z-10 p-2 text-xs bg-background text-text rounded shadow-lg w-auto text-nowrap">
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
