import {
  CustomDocument,
  CustomHTMLCollection,
  HTMLElementProps,
} from '../html.types';
import { BuildRender } from '../common.types';
import buildAppendChild from './build-append-child';
import buildCreateElement from './build-create-html-element';

export const buildRender: BuildRender = (document: CustomDocument) => {
  if (document) {
    const createElement = buildCreateElement(document);
    const appendChild = buildAppendChild(document, createElement);

    return (
      (props: HTMLElementProps = {}): CustomHTMLCollection => {
        return props
          ? appendChild(props).children as unknown as CustomHTMLCollection
          : null;
      }
    );
  }

  return null;
};
