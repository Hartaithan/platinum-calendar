import type { ComponentPropsWithoutRef, FC } from "react";

const IconUpload: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
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
      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v12" />
    </svg>
  );
};

export default IconUpload;
