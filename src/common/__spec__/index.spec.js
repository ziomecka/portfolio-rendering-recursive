import * as sinon from 'sinon';
import { Document } from './document.stub';
import { buildRender } from '../index';
import { expect } from 'chai';
import fixtures from './fixtures';

const { spy } = sinon;

describe('buildRender returns function that', () => {
  let render;
  let document;
  let jsdom;

  beforeEach(() => {
    ({ document, jsdom } = Document());
    render = buildRender(document);
  });

  it('calls createDocumentFragment and createElement for single node', () => {
    // given
    spy(document, 'createDocumentFragment');
    spy(document, 'createElement');

    // when
    render(fixtures.fooProps);

    // then
    expect(document.createDocumentFragment.calledOnce).to.be.true;
    expect(document.createElement.calledOnce).to.be.true;
    expect(document.createElement.calledWith(fixtures.fooProps.HTMLTag)).to.be.true;

    // clean up
    document.createDocumentFragment.restore();
    document.createElement.restore();
  });

  it('returns node', () => {
    // when
    const htmlCollection = render(fixtures.fooProps);

    // then
    expect(htmlCollection).to.have.lengthOf(1);
  });

  it('calls createDocumentFragment & createElement for nested nodes', () => {
    // given
    spy(document, 'createDocumentFragment');
    spy(document, 'createElement');

    // when
    render(fixtures.nested);

    document.createDocumentFragment.getCalls()
    // then
    expect(document.createDocumentFragment.getCalls()).to.have.lengthOf(3);
    expect(document.createElement.getCalls()).to.have.lengthOf(3)

    const { args: [ tagName ] } = document.createElement.getCalls()[1];
    expect(tagName).to.equal(fixtures.barProps.HTMLTag);

    // clean up
    document.createDocumentFragment.restore();
    document.createElement.restore();
  });

  it('returns nested nodes', () => {
    // when
    const htmlCollection = render(fixtures.nested);

    // then
    const [ $node ] = htmlCollection;
    expect($node.children).to.have.lengthOf(1);

    const [ $child ] = $node.children;
    expect($child.tagName.toLowerCase()).to.equal(fixtures.barProps.HTMLTag);
    expect($child.className).to.equal(fixtures.barProps.className);

    const deepestChildren = $child.children;
    expect(deepestChildren).to.have.lengthOf(fixtures.nested.children[0].children.length)
  });

  fixtures.scenarios.forEach(({ props, result }) => {
    it(`returns correct html for props: ${ JSON.stringify(props) }`, () => {
      // given
      const htmlCollection = render(props);

      // when
      document.getElementById('root').append(htmlCollection[0]);

      // then
      expect(jsdom.serialize(document)).to.equal(result);
    });
  });
});
