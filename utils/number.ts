export const toFixed = (value: number, fraction = 1): number => {
  return parseFloat(value.toFixed(fraction));
};

export const getProgress = (value: number, total: number) => {
  const progress = Math.round((value / total) * 100);
  if (progress < 0 || isNaN(progress) || !isFinite(progress)) return "0%";
  return `${progress}%`;
};
