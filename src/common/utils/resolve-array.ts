export const resolveArray = (property: string, arr: string[]): string => {
  return arr.join(`; ${ property }:`);
};
