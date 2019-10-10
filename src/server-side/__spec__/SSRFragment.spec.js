import * as sinon from 'sinon';
import { expect } from 'chai';
import { SSRFragment } from '../SSRFragment';

describe('SSRFragment', () => {
  it('returns empty string', () => {
    // when
    const ssrFragment = new SSRFragment();

    // then
    expect(ssrFragment.toString()).to.equal('');
  });

  it('appends elements', () => {
    // given
    const ssrFragment = new SSRFragment();

    const firstElement = '<p className="some-class">some text<p>';
    const secondElement = '<span className="some-class">some other text<span>';
    const firstElementStub = { toString: sinon.stub().returns(firstElement) };
    const secondElementStub = { toString: sinon.stub().returns(secondElement) };

    // when
    ssrFragment.append(firstElementStub);
    ssrFragment.append(secondElementStub);

    // then
    expect(ssrFragment.toString()).to.equal(firstElement + secondElement);
  });
});
