export const createArray = (n: number) => {
  let i = 0;
  let a = Array(n);
  while (i < n) a[i++] = i;
  return a;
};
