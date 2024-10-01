export const wait = (value: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, value);
  });
};
