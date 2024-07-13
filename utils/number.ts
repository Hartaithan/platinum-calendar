export const toNumber = (value: string): number => {
  const formatted = value.replace(/[,#%]/g, "");
  return Number(formatted);
};
