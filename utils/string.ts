export const cleanString = (value: string): string => {
  return value.replace(/\n|\t/g, "").trim();
};
