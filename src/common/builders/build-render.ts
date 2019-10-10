import {
  BuildRender,
  CustomDocument,
  CustomHTMLCollection,
  CustomHTMLElementProps,
} from '../types';
import buildAppendChild from './build-append-child';
import buildCreateElement from './build-create-html-element';

export const buildRender: BuildRender = (document: CustomDocument) => {
  if (document) {
    const createElement = buildCreateElement(document);
    const appendChild = buildAppendChild(document, createElement);

    return (
      (props: CustomHTMLElementProps = {}): CustomHTMLCollection => {
        return props
          ? appendChild(props).children as unknown as CustomHTMLCollection
          : null;
      }
    );
  }

  return null;
};
