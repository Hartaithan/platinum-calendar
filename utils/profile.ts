import { notFound } from "@/constants/messages";
import type { Profile, ProfileLevel } from "@/models/profile";
import type { TrophyCounts } from "@/models/trophy";
import type { AnyNode, CheerioAPI } from "cheerio";
import { load } from "cheerio";
import { toNumber } from "@/utils/number";

const select = {
  link: "li.active a",
  name: "span.username",
  avatar: "div.avatar img",
  level: "div.level-box span",
  progress: "div.level-box div.level > div",
  stats: "div.stats > span.stat",
  total: "li.total",
  platinum: "li.platinum",
  gold: "li.gold",
  silver: "li.silver",
  bronze: "li.bronze",
  country: "img.round-flags",
  plus: "div.ps-plus",
};

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

const getLevel = (cheerio: CheerioAPI): ProfileLevel => {
  const value = cheerio(select.level).first().text() || notFound;
  const progressStyle = cheerio(select.progress).attr("style");
  const progressMatch = progressStyle?.match(/width:\s*(\d+)%/);
  const progress = progressMatch ? progressMatch[1] : notFound;
  return { value: toNumber(value), progress: toNumber(progress) };
};

const getCounty = (cheerio: CheerioAPI): string => {
  const element = cheerio(select.country).first();
  const classes = element.attr("class");
  const country = classes && classes.split(" ").pop();
  return country ?? notFound;
};

export const parseProfile = (content: string): Profile | null => {
  const cheerio = load(content);

  const link = cheerio(select.link).first().text().trim();
  const isProfileExists = link === "Profile";

  if (!isProfileExists) return null;

  const name = cheerio(select.name).text().trim() || notFound;
  const avatar_url = cheerio(select.avatar).first().attr("src") || notFound;
  const level = getLevel(cheerio);
  const country = getCounty(cheerio);
  const plus = cheerio(select.plus).length > 0;

  const total = cheerio(select.total).first().text().trim() || notFound;
  const platinum = cheerio(select.platinum).first().text().trim() || notFound;
  const gold = cheerio(select.gold).first().text().trim() || notFound;
  const silver = cheerio(select.silver).first().text().trim() || notFound;
  const bronze = cheerio(select.bronze).first().text().trim() || notFound;
  const counts: TrophyCounts = {
    total: toNumber(total),
    platinum: toNumber(platinum),
    gold: toNumber(gold),
    silver: toNumber(silver),
    bronze: toNumber(bronze),
  };

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
    counts,
    games_played: toNumber(games_played),
    completed_games: toNumber(completed_games),
    completion: toNumber(completion),
    unearned_trophies: toNumber(unearned_trophies),
    trophies_per_day: toNumber(trophies_per_day),
    views: toNumber(views),
    country,
    world_rank: toNumber(world_rank),
    country_rank: toNumber(country_rank),
    plus,
  };
};
