import { notFound } from "@/constants/messages";
import type { Platinum, PlatinumsResponse } from "@/models/trophy";
import type { CheerioAPI } from "cheerio";
import { load } from "cheerio";
import { convertParsedDate } from "@/utils/date";
import { toNumber } from "@/utils/number";
import { cleanString } from "@/utils/string";

const select = {
  table: "table.zebra",
  rows: "tbody > tr",
  image: (row: number) => `td:nth-child(${row}) > a > img`,
  content: "td:nth-child(3)",
  title: "a.title",
  number: "td:nth-child(5) > b",
  date: "td:nth-child(6) > span",
  achievers: "td:nth-child(7) > span > span.typo-top",
  owners: "td:nth-child(8) > span > span.typo-top",
  uncommon: "td:nth-child(9) > span > span.typo-top",
  pagination: "ul.pagination",
  currentPage: "a.typo-button.active",
};

const getList = (cheerio: CheerioAPI): Platinum[] => {
  const list: Platinum[] = [];
  const table = cheerio(select.table).first();
  const rows = table.find(select.rows);
  rows.each((_, element) => {
    const row = cheerio(element);

    const game_image_url = row.find(select.image(1)).attr("src") || notFound;
    const trophy_image_url = row.find(select.image(2)).attr("src") || notFound;

    const content = row.find(select.content);
    const title = content.find(select.title).text() || notFound;
    const description = content.children().remove().end().text() || notFound;

    const number = row.find(select.number).text() || notFound;
    const date = row.find(select.date).text() || notFound;
    const achievers = row.find(select.achievers).text() || notFound;
    const owners = row.find(select.owners).text() || notFound;
    const uncommon = row.find(select.uncommon).text() || notFound;

    list.push({
      game_image_url,
      trophy_image_url,
      title,
      description: cleanString(description),
      number: toNumber(number),
      date: convertParsedDate(date),
      achievers: toNumber(achievers),
      owners: toNumber(owners),
      uncommon: toNumber(uncommon),
    });
  });
  return list;
};

export const parsePlatinums = (content: string): PlatinumsResponse => {
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
