import * as sinon from 'sinon';
import { Document } from './document.stub';
import { buildRender } from '../index';
import { expect } from 'chai';

const { spy } = sinon;

describe('buildRender returns function that', () => {
  const fooProps = {
    HTMLTag: 'div',
    value: 'some foo text',
    className: 'some-foo-class',
  };

  const barProps = {
    HTMLTag: 'p',
    value: 'some bar text',
    className: 'some-bar-class',
  };

  const someProps = {
    HTMLTag: 'span',
    value: 'some some text',
    className: 'some-some-class',
  };

  const nested = {
    ...fooProps,
    children: [
      {
        ...barProps,
        children: [
          { ...someProps },
          { ...someProps },
          { ...someProps },
        ],
      },
    ],
  };

  const expectedNestedHtml = '<!DOCTYPE html><html><head></head><body><div id="root"><div class="some-foo-class"><p class="some-bar-class"><span class="some-some-class"></span><span class="some-some-class"></span><span class="some-some-class"></span></p></div></div></body></html>';
  const render = buildRender(document);
  let document;
  let jsdom;

  beforeEach(() => {
    ({ document, jsdom } = Document());
  });

  it('calls createDocumentFragment and createElement for single node', () => {
    // given
    spy(document, 'createDocumentFragment');
    spy(document, 'createElement');

    // when
    render(fooProps);

    // then
    expect(document.createDocumentFragment.calledOnce).to.be.true;
    expect(document.createElement.calledOnce).to.be.true;
    expect(document.createElement.calledWith(fooProps.HTMLTag)).to.be.true;

    // clean up
    document.createDocumentFragment.restore();
    document.createElement.restore();
  });

  it('returns node', () => {
    // when
    const htmlCollection = render(fooProps);

    // then
    expect(htmlCollection).to.have.lengthOf(1);
  });

  it('calls createDocumentFragment & createElement for nested nodes', () => {
    // given
    spy(document, 'createDocumentFragment');
    spy(document, 'createElement');

    // when
    render(nested);

    document.createDocumentFragment.getCalls()
    // then
    expect(document.createDocumentFragment.getCalls()).to.have.lengthOf(3);
    expect(document.createElement.getCalls()).to.have.lengthOf(5)

    const { args: [ tagName ] } = document.createElement.getCalls()[1];
    expect(tagName).to.equal(barProps.HTMLTag);

    // clean up
    document.createDocumentFragment.restore();
    document.createElement.restore();
  });

  it('returns nested nodes', () => {
    // when
    const htmlCollection = render(nested);

    // then
    const [ $node ] = htmlCollection;
    expect($node.children).to.have.lengthOf(1);

    const [ $child ] = $node.children;
    expect($child.tagName.toLowerCase()).to.equal(barProps.HTMLTag);
    expect($child.innerText).to.equal(barProps.value);
    expect($child.className).to.equal(barProps.className);

    const deepestChildren = $child.children;
    expect(deepestChildren).to.have.lengthOf(nested.children[0].children.length)
  });

  it('returns correct html', () => {
    // given
    const htmlCollection = render(nested);

    // when
    document.getElementById('root').append(htmlCollection[0]);

    // then
    expect(jsdom.serialize(document)).to.equal(expectedNestedHtml);
});
