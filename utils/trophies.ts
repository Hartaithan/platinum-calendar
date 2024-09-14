import { notFound } from "@/constants/messages";
import type {
  Game,
  GroupedPlatinumKeys,
  GroupedPlatinumList,
  GroupedPlatinums,
  Platinum,
  PlatinumsResponseData,
  Rarity,
} from "@/models/trophy";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import { load } from "cheerio";
import { convertParsedDate, getDateKeys } from "@/utils/date";
import { toNumber } from "@/utils/number";
import { cleanString } from "@/utils/string";

const select = {
  table: "table.zebra",
  rows: "tbody > tr",
  link: (row: number) => `td:nth-child(${row}) > a`,
  image: (row: number) => `td:nth-child(${row}) > a > img`,
  content: "td:nth-child(3)",
  title: "a.title",
  number: "td:nth-child(5) > b",
  date: "td:nth-child(6) > span",
  achievers: "td:nth-child(7) > span > span.typo-top",
  owners: "td:nth-child(8) > span > span.typo-top",
  rarityValue: "td:nth-child(9) > span > span.typo-top",
  rarityType: "td:nth-child(9) > span > span.typo-bottom",
  pagination: "ul.pagination",
  currentPage: "a.typo-button.active",
};

const getGameId = (url: string | undefined): string | null => {
  if (!url) return null;
  const match = url.match(/\/trophies\/([^\/]+)/);
  return match ? match[1] : null;
};

const getGame = (row: Cheerio<Element>): Game => {
  const link = row.find(select.link(1));
  const image = row.find(select.image(1));
  const id = getGameId(link.attr("href")) || notFound;
  const title = image.attr("title") || notFound;
  const image_url = image.attr("src") || notFound;
  return { id, title, image_url };
};

const getRarity = (row: Cheerio<Element>): Rarity => {
  const value = row.find(select.rarityValue).text() || notFound;
  const type = row.find(select.rarityType).text().toLowerCase() || notFound;
  return { value: toNumber(value), type };
};

const getList = (cheerio: CheerioAPI): Platinum[] => {
  const list: Platinum[] = [];
  const table = cheerio(select.table).first();
  const rows = table.find(select.rows);
  rows.each((_, element) => {
    const row = cheerio(element);

    const game = getGame(row);
    const game_id = game.id;

    const content = row.find(select.content);
    const image_url = row.find(select.image(2)).attr("src") || notFound;
    const title = content.find(select.title).text() || notFound;
    const description = content.children().remove().end().text() || notFound;

    const number = row.find(select.number).text() || notFound;
    const date = row.find(select.date).text() || notFound;
    const achievers = row.find(select.achievers).text() || notFound;
    const owners = row.find(select.owners).text() || notFound;

    const rarity = getRarity(row);

    list.push({
      game,
      game_id,
      image_url,
      title,
      description: cleanString(description),
      number: toNumber(number),
      date: convertParsedDate(date),
      achievers: toNumber(achievers),
      owners: toNumber(owners),
      rarity,
    });
  });
  return list;
};

export const parsePlatinums = (content: string): PlatinumsResponseData => {
  const cheerio = load(content);

  const list = getList(cheerio);

  const pagination = cheerio(select.pagination).first();
  const currentPageElement = pagination.find(select.currentPage);
  const currentPageParent = currentPageElement.parent();
  const current_page = Number(currentPageElement.text());
  const previous_page = Number(currentPageParent.prev().text()) || null;
  const next_page = Number(currentPageParent.next().text()) || null;

  return { list, current_page, previous_page, next_page };
};

export const setGroupValue = (
  key: string,
  item: Platinum,
  result: GroupedPlatinumKeys,
) => {
  if (result[key] !== undefined) {
    result[key].push(item.game_id);
  } else {
    result[key] = [item.game_id];
  }
};

export const groupPlatinumList = (list: Platinum[]): GroupedPlatinumList => {
  let groups: GroupedPlatinumKeys = {};
  let platinums: GroupedPlatinums = {};
  for (const plat of list) {
    const { date, game_id } = plat;

    const keys = Object.values(getDateKeys(date));
    for (const key of keys) setGroupValue(key, plat, groups);

    platinums[game_id] = plat;
  }
  return { platinums, groups };
};
