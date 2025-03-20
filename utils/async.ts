export const wait = (value: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, value);
  });
};

export const debounce = (callback: (...args: any) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
};
