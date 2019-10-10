import { expect } from 'chai';
import { SSRElement } from '../SSRElement';

describe('SSRElement', () => {
  it('returns div element', () => {
    // when
    const ssrElement =  new SSRElement('div');

    // then
    expect(ssrElement.toString()).to.equal('<div></div>');
  });

  it('returns div element with className', () => {
    // given
    const className = 'some-class';
    const ssrElement = new SSRElement('div');

    // when
    ssrElement.classList.add(className);

    // then
    expect(ssrElement.toString())
      .to.equal(`<div class="${ className }"></div>`);
  });

  it('returns div element with innerText', () => {
    // given
    const innerText = 'Some inner text.'
    const ssrElement = new SSRElement('div');
    // when
    ssrElement.innerText = innerText;

    // then
    expect(ssrElement.toString()).to.equal(`<div>${ innerText }</div>`);
  });
});
