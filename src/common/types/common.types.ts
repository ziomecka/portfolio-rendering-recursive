import {
  CustomDocument,
  CustomDocumentFragment,
  CustomHTMLCollection,
  CustomHTMLElement,
  CustomHTMLElementProps,
} from './html.types';

export type BuildRender =
  (document: CustomDocument, appendChild?: AppendChild) => (
    (props: CustomHTMLElementProps) => CustomHTMLCollection
  );

export type CreateElement =
  (props: CustomHTMLElementProps) => CustomHTMLElement;

export type AppendChild = (
    props: CustomHTMLElementProps,
    documentFragment?: CustomDocumentFragment,
  ) => CustomDocumentFragment;
