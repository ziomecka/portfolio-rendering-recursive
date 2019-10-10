export const concatTexts = (...texts: string[]): string => (
  texts.reduce((combined, str) => {
    combined += str ? ` ${ str }` : '';
    return combined;
  }, '').trim()
);
