const { JSDOM } = require('jsdom');

export const Document = () => {
  const html = '<!doctype html><div id="root"></div>';
  const jsdom = new JSDOM(html);
  const { window: { document } } = jsdom;

  return { document , jsdom };
};
