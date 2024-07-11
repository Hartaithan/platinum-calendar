import { notFound } from "@/constants/messages";

const months: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export const pad = (value: string): string => {
  return value.padStart(2, "0");
};

export const convertParsedDate = (date: string): string => {
  const pattern =
    /(\d{1,2})(st|nd|rd|th)\s(\w{3})\s(\d{4})(\d{1,2}:\d{2}:\d{2})\s(AM|PM)/;
  const match = date.match(pattern);

  if (!match) return notFound;

  const [, day, , month, year, time, period] = match;
  const dayFormatted = pad(day);
  const monthFormatted = months[month];

  if (!monthFormatted) return notFound;

  let [hours, minutes, seconds] = time.split(":");
  if (period === "PM" && hours !== "12") {
    hours = (Number(hours) + 12).toString();
  } else if (period === "AM" && hours === "12") {
    hours = "00";
  }

  const timeFormatted = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  const isoDate = `${year}-${monthFormatted}-${dayFormatted}T${timeFormatted}Z`;
  return isoDate;
};
