import type { ComponentPropsWithoutRef, FC } from "react";

const RedditIcon: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
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
      viewBox="0 0 24 24"
      {...props}>
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M12 8c2.648 0 5.028.826 6.675 2.14a2.5 2.5 0 012.326 4.36c0 3.59-4.03 6.5-9 6.5-4.875 0-8.845-2.8-9-6.294l-1-.206a2.5 2.5 0 012.326-4.36C5.973 8.827 8.353 8 11.001 8zM12 8l1-5 6 1" />
      <path d="M18 4a1 1 0 102 0 1 1 0 10-2 0" />
      <circle cx="9" cy="13" r="0.5" fill="currentColor" />
      <circle cx="15" cy="13" r="0.5" fill="currentColor" />
      <path d="M10 17c.667.333 1.333.5 2 .5s1.333-.167 2-.5" />
    </svg>
  );
};

export default RedditIcon;
