import {
  CustomDocument,
  CustomHTMLElement,
  CustomHTMLElementProps,
} from '../types/';

const buildCreateHTMLElement = (document: CustomDocument) => (
  ({
    HTMLTag,
    value,
    className = '',
    eventHandlers = {},
    innerHTML,
    style = {},
    attributes = {},
  }: CustomHTMLElementProps = { style: {}, attributes: {}, eventHandlers: {} },
  ): CustomHTMLElement => {
    const $element = document.createElement(HTMLTag);

    if (value) $element.append(document.createTextNode(value));

    className
      .split(' ')
      .forEach(name => name && $element.classList.add(name));

    if (innerHTML) $element.innerHTML = innerHTML;

    Object.keys(style).forEach(key => {
      $element.style[key] = style[key];
    });

    Object.keys(attributes).forEach(key => {
      $element.setAttribute(key, attributes[ key ]);
    });

    Object.keys(eventHandlers).forEach(eventName => {
      $element.addEventListener(
        eventName.slice(2).toLowerCase(),
        eventHandlers[eventName]
      );
    });

    return $element as unknown as CustomHTMLElement;
  }
);

export default buildCreateHTMLElement;
