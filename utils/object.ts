export const objectToString = (
  value: Record<string, unknown> | null | undefined | FormData,
  emptyValue = "",
) => {
  if (!value) return emptyValue;
  if (Object.keys(value).length === 0) return emptyValue;
  return JSON.stringify(value);
};
