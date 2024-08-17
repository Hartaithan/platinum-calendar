import { URL } from "@/constants/variables";
import { cleanLink } from "@/utils/string";

export const getLinkMessage = () => {
  const link = cleanLink(URL);
  const message = "Generate your own calendar at";
  return { message, href: URL, link, full: `${message} ${link}` };
};
