import type { ComponentPropsWithoutRef, FC } from "react";

const IconClose: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="2 2 20 20"
      {...props}>
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};

export default IconClose;
