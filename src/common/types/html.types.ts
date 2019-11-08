import { EventHandlers } from './event.types';
import { HTMLTag } from './HTMLTag.types';

export type Style = {
  [key: string]: string | number | boolean;
};

export type CustomHTMLElementProps = {
  HTMLTag?: HTMLTag;
  value?: string;
  innerHTML?: string;
  className?: string;
  children?: (CustomHTMLElementProps)[];
  eventHandlers?: EventHandlers;
  style?: Style;
  attributes?: CustomElementAttributes;
}

type CustomAppend = (
  element: CustomHTMLElement | CustomDocumentFragment | CustomTextNode
) => void;

export interface CustomHTMLElement {
  HTMLTag?: HTMLTag;
  innerText?: string;
  innerHTML?: string;
  className?: string;
  children?: string;
  append: CustomAppend;
  classList?: { add(value: string): void };
  style?: Style;
  addEventListener(
    eventName: string,
    callback: (event: Event) => void,
    useCapture?: boolean
  ): void;
  setAttribute(name: string, value: string): void;
}

export interface CustomDocument {
  createDocumentFragment(): CustomDocumentFragment;
  createElement(value: HTMLTag): CustomHTMLElement;
  createTextNode(value: string): CustomTextNode;
}

export type CustomTextNode = string;

export interface CustomDocumentFragment {
  append: CustomAppend;
  children: { length: number };
}

export interface CustomHTMLCollection {
  length: number;
  children: { length: number };
}

export interface CustomElementAttributes {
  id?: string;
  title?: string;
  href?: string;
  src?: string;
}
