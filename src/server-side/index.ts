import {
  CustomHTMLElementProps,
  EventHandlers,
  HTMLTag,
  buildRender,
} from '../common/';
import { SSRDocument } from './SSRDocument';
import { SSRElement } from './SSRElement';
import { SSRFragment } from './SSRFragment';

type SSRCollection = (SSRElement | SSRFragment)[];

const _render = buildRender(new SSRDocument());

const render =
  (props: CustomHTMLElementProps = {}): string => (
    (_render(props) as unknown as SSRCollection)
      .map(child => child.toString()).join('')
  );

export default render;

export {
  CustomHTMLElementProps,
  EventHandlers,
  HTMLTag,
};
