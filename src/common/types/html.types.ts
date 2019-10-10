import { EventHandlers } from './event.types';
import { HTMLTag } from './HTMLTag.types';

export type CustomHTMLElementProps = {
  HTMLTag?: HTMLTag;
  value?: string;
  className?: string;
  children?: CustomHTMLElementProps[];
  innerHTML?: string;
  eventHandlers?: EventHandlers;
  style?: Record<string, string>;
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
  append: CustomAppend;
  classList?: { add(value: string): void };
  style?: Record<string, string>;
  addEventListener(eventName: string, callback: (event: Event) => void): void;
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