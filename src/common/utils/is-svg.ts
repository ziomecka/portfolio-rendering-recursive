export const isSvg = (str: string): boolean => {
  return /^<svg[\w\s:.;&/"-=<>\\]*<\/svg>$/.test(str);
};
