import type { ProfileResponse } from "@/models/profile";
import { load } from "cheerio";

const select = {
  name: "span.username",
  avatar: "div.avatar img",
  level: "div.level-box span",
};

const notFound = "Not Found";

export const getProfile = (content: string): Partial<ProfileResponse> => {
  const cheerio = load(content);

  const name = cheerio(select.name).text() || notFound;

  const avatar_url = cheerio(select.avatar).first().attr("src") || notFound;

  const level = cheerio(select.level).first().text() || notFound;

  return { name, avatar_url, level };
};
