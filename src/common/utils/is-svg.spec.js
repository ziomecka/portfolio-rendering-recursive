import { expect } from 'chai';
import { isSvg } from './is-svg';

const scenarios = [
  {
    text: '',
    result: false,
  },
  {
    text: '<svg></svg>',
    result: true,
  },
  {
    text: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>',
    result: true,
  },
  {
    text: '<div xmlns="http://www.w3.org/2000/div" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></div>',
    result: false,
  },
];

describe('isSvg', () => {
  scenarios.forEach(({ text, result }) => {
    it(`returns ${ result } for ${ text }`, () => {
      // const a = '<svg></svg>';

      expect(isSvg(text)).to.equal(result);
    });
  });
});
