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

  const nested = {
    ...fooProps,
    children: [ { ...barProps } ],
  };

  const document = new Document();
  const render = buildRender(document);

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

    // then
    expect(document.createDocumentFragment.calledTwice).to.be.true;
    expect(document.createElement.calledTwice).to.be.true;

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

    const [ $child ] = $node.children[ 0 ].children;
    expect($child.tagName).to.equal(barProps.HTMLTag);
    expect($child.innerText).to.equal(barProps.value);
    expect($child.className).to.equal(barProps.className);
  });
});
