import type { FC } from "react";
import { getLinkMessage } from "@/utils/link";

const LinkMessage: FC = () => {
  const { message, href, link } = getLinkMessage();
  return (
    <span className="hidden @save:block w-full text-sm text-center lg:text-right @save:text-right pt-6 md:pt-3 @save:pt-3">
      {message}&nbsp;
      <a
        className="font-medium hover:text-foreground visited:text-foreground"
        target="_blank"
        href={href}>
        {link}
      </a>
    </span>
  );
};

export default LinkMessage;
