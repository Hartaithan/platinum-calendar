import { getLinkMessage } from "@/utils/link";
import type { FC } from "react";

const LinkMessage: FC = () => {
  const { message, href, link } = getLinkMessage();
  return (
    <span className="hidden w-full pt-6 text-center text-sm @save:!block @save:!pt-3 @save:!text-right md:pt-3 lg:text-right">
      {message}&nbsp;
      <a
        className="font-medium visited:text-foreground hover:text-foreground"
        target="_blank"
        href={href}>
        {link}
      </a>
    </span>
  );
};

export default LinkMessage;
