import type { ComponentPropsWithoutRef, FC } from "react";

const IconDeviceFloppy: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="2 2 20 20"
      {...props}>
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M6 4h10l4 4v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2" />
      <path d="M10 14a2 2 0 104 0 2 2 0 10-4 0M14 4v4H8V4" />
    </svg>
  );
};

export default IconDeviceFloppy;
