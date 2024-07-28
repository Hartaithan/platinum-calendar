import type { ComponentPropsWithoutRef, FC } from "react";

const IconCircleCheck: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="2 2 20 20"
      {...props}>
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M3 12a9 9 0 1018 0 9 9 0 10-18 0" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
};

export default IconCircleCheck;
