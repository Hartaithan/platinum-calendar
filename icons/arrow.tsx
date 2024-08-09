import type { ComponentPropsWithoutRef, FC } from "react";

const IconArrow: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
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
      <path d="M5 12h14M13 18l6-6M13 6l6 6" />
    </svg>
  );
};

export default IconArrow;
