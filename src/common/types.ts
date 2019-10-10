export type buildRender =
  BuildRender<CustomDocument, CustomHTMLCollection, HTMLElementProps>;

export type HTMLTag = |
'p' |
'main' |
'div' |
'header' |
'footer' |
'nav' |
'sidebar' |
'custom';

export type HTMLElementProps = {
  HTMLTag?: HTMLTag;
  value?: string;
  className?: string;
  children?: HTMLElementProps[];
}

type CustomAppend =
  (element: CustomHTMLElement | CustomDocumentFragment) => void;

export interface CustomHTMLElement {
  HTMLTag?: HTMLTag;
  innerText: string;
  className: string;
  append: CustomAppend;
  classList?: { add(value: string): void };
}

export interface CustomDocument {
  createDocumentFragment(): CustomDocumentFragment;
  createElement(value: HTMLTag): CustomHTMLElement;
}

export interface CustomDocumentFragment {
  append: CustomAppend;
  children: { length: number };
}

export interface CustomHTMLCollection {
  length: number;
  children: { length: number };
}

type Render<P, C> = (props: P) => C;
type BuildRender<D, C, P> = (document: D) => Render<P, C>;
