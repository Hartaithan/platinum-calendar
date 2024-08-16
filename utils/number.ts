export const toNumber = (value: string): number => {
  const formatted = value.replace(/[,#%]/g, "");
  const result = Number(formatted);
  return !Number.isNaN(result) ? result : 0;
};
