export const toFixed = (value: number, fraction = 1): number => {
  return parseFloat(value.toFixed(fraction));
};

export const getProgress = (value: number, total: number) => {
  const progress = Math.round(((value - 1) / total) * 100);
  return `${progress}%`;
};
