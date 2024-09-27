export const cleanString = (value: string): string => {
  return value.replace(/\n|\t/g, "").trim();
};

export const cleanLink = (value: string) => {
  const cleaned = value.replace(/^https?:\/\//, "");
  return cleaned.split("/")[0];
};

export const pad = (value: string | number, start = 2): string => {
  if (typeof value === "string") return value.padStart(start, "0");
  return value.toString().padStart(start, "0");
};
