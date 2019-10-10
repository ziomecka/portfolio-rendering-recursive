export type buildRender =
  BuildRender<CustomDocument, CustomHTMLCollection, HTMLElementProps>;

export type HTMLTag = |
'a' |
'button' |
'div' |
'footer' |
'form' |
'header' |
'img' |
'input' |
'label' |
'main' |
'nav' |
'p' |
'picture' |
'sidebar' |
'span' |
'template';

export type HTMLElementProps = {
  HTMLTag?: HTMLTag;
  value?: string;
  className?: string;
  children?: HTMLElementProps[];
  attributes?: CustomElementAttributes;
}

type CustomAppend =
  (element: CustomHTMLElement | CustomDocumentFragment) => void;

export interface CustomHTMLElement {
  HTMLTag?: HTMLTag;
  innerText: string;
  className: string;
  append: CustomAppend;
  classList?: { add(value: string): void };
  setAttribute(name: string, value: string): void;
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

export interface CustomElementAttributes {
  id?: string;
  title?: string;
  href?: string;
  src?: string;
}
