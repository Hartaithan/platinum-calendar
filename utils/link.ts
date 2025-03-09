import { APP_URL } from "@/constants/variables";
import { cleanLink } from "@/utils/string";

export const getLinkMessage = () => {
  const link = cleanLink(APP_URL);
  const message = "Generate your own calendar at";
  return { message, href: APP_URL, link, full: `${message} ${link}` };
};
