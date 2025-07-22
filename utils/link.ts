import { APP_URL } from "@/constants/variables";

export const cleanLink = (value: string) => {
  const cleaned = value.replace(/^https?:\/\//, "");
  return cleaned.split("/")[0];
};

export const getLinkMessage = () => {
  const link = cleanLink(APP_URL);
  const message = "Generate your own calendar at";
  return { message, href: APP_URL, link, full: `${message} ${link}` };
};
