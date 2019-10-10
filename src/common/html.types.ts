import { HTMLTag } from './HTMLTag.types';

export type HTMLElementProps = {
  HTMLTag?: HTMLTag;
  value?: string;
  label?: string;
  className?: string;
  children?: HTMLElementProps[];
  innerHTML?: string;
  onClick?(...args: unknown[]): void;
  onSubmit?(...args: unknown[]): void;
  onChange?(...args: unknown[]): void;
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
