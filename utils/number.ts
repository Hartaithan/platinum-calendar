export const toNumber = (value: string): number => {
  const formatted = value.replace(/[,#%]/g, "");
  const result = Number(formatted);
  return !Number.isNaN(result) ? result : 0;
};

export const toFixed = (value: number, fraction = 1): number => {
  return parseFloat(value.toFixed(fraction));
};
