import { expect } from 'chai';
import fixtures from './fixtures';
import render from '../../index.ts';

describe('server-side render function', () => {
  it('returns string with div element', () => {
    // then
    expect(render({ HTMLTag: 'div' })).to.equal('<div></div>');
  });

  fixtures.scenarios.forEach(({ props, result }) => {
    it(`returns string with nested nodes, ${ result }`, () => {
      // then
      expect(render(props)).to.equal(result);
    });
  });
});
