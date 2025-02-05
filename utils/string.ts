export const cleanLink = (value: string) => {
  const cleaned = value.replace(/^https?:\/\//, "");
  return cleaned.split("/")[0];
};

export const pluralize = (count: number, noun: string, suffix = "s") => {
  return `${count} ${noun}${count !== 1 ? suffix : ""}`;
};
