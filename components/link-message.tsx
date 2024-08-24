import type { FC } from "react";
import { getLinkMessage } from "@/utils/link";

const LinkMessage: FC = () => {
  const { message, href, link } = getLinkMessage();
  return (
    <div className="flex w-full justify-end pt-6 md:pt-3 @save:pt-3 text-sm">
      <span className="text-right">
        {message}&nbsp;
        <a
          className="font-medium hover:text-text visited:text-text"
          target="_blank"
          href={href}>
          {link}
        </a>
      </span>
    </div>
  );
};

export default LinkMessage;
