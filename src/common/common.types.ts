import {
  CustomDocument,
  CustomDocumentFragment,
  CustomHTMLCollection,
  CustomHTMLElement,
  HTMLElementProps,
} from './html.types';

export type BuildRender =
  (document: CustomDocument, appendChild?: AppendChild) => (
    (props: HTMLElementProps) => CustomHTMLCollection
  );

export type CreateElement = (props: HTMLElementProps) => CustomHTMLElement;

export type AppendChild = (
  props: HTMLElementProps,
  documentFragment?: CustomDocumentFragment,
) => CustomDocumentFragment;
