import type { ProfileResponse } from "@/models/profile";
import type { AnyNode, CheerioAPI } from "cheerio";
import { load } from "cheerio";

const select = {
  name: "span.username",
  avatar: "div.avatar img",
  level: "div.level-box span",
  stats: "div.stats > span.stat",
};

const notFound = "Not Found";

const statsMapped: Record<number, string> = {
  0: "games_played",
  1: "completed_games",
  2: "completion",
  3: "unearned_trophies",
  4: "trophies_per_day",
  5: "views",
  6: "world_rank",
  7: "country_rank",
};

const cleanStat = (cheerio: CheerioAPI, node: AnyNode): string => {
  const element = cheerio(node).clone();
  const links = element.has("a");
  if (links.length > 0) {
    const link = element.find("a");
    return link.children().remove().end().text().trim();
  } else {
    return element.children().remove().end().text().trim();
  }
};

const getStats = (cheerio: CheerioAPI): Record<string, string> => {
  const elements = cheerio(select.stats);
  const stats: Record<string, string> = {
    games_played: notFound,
    completed_games: notFound,
    completion: notFound,
    unearned_trophies: notFound,
    trophies_per_day: notFound,
    views: notFound,
    world_rank: notFound,
    country_rank: notFound,
  };
  elements.each((i, stat) => {
    const key = statsMapped[i];
    stats[key] = cleanStat(cheerio, stat);
  });
  return stats;
};

export const getProfile = (content: string): Partial<ProfileResponse> => {
  const cheerio = load(content);

  const name = cheerio(select.name).text() || notFound;
  const avatar_url = cheerio(select.avatar).first().attr("src") || notFound;
  const level = cheerio(select.level).first().text() || notFound;

  const {
    games_played,
    completed_games,
    completion,
    unearned_trophies,
    trophies_per_day,
    views,
    world_rank,
    country_rank,
  } = getStats(cheerio);

  return {
    name,
    avatar_url,
    level,
    games_played,
    completed_games,
    completion,
    unearned_trophies,
    trophies_per_day,
    views,
    world_rank,
    country_rank,
  };
};
