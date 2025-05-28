export const createEmptyArray = (length: number) =>
  Array.from({ length }, (_, index) => index + 1);
