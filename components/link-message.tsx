import { URL } from "@/constants/variables";
import { cleanUrl } from "@/utils/string";
import type { FC } from "react";

const LinkMessage: FC = () => {
  return (
    <div className="flex justify-end pt-3 text-sm">
      <span>
        Generate your own calendar at&nbsp;
        <a
          className="font-medium hover:text-text visited:text-text"
          target="_blank"
          href={URL}>
          {cleanUrl(URL)}
        </a>
      </span>
    </div>
  );
};

export default LinkMessage;
