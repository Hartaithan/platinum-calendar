export const toFixed = (value: number, fraction = 1): number => {
  return parseFloat(value.toFixed(fraction));
};
