export const cleanString = (value: string): string => {
  return value.replace(/\n|\t/g, "").trim();
};

export const cleanLink = (value: string) => {
  const cleaned = value.replace(/^https?:\/\//, "");
  return cleaned.split("/")[0];
};
