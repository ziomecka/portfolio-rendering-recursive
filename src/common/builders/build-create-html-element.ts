import {
  CustomDocument,
  CustomHTMLElement,
  CustomHTMLElementProps,
} from '../types/';
import { concatTexts } from '../utils/concat-texts';

const buildCreateHTMLElement = (document: CustomDocument) => (
  ({
    HTMLTag,
    value,
    label,
    className,
    eventHandlers = {},
    innerHTML,
    style = {},
    attributes = {},
  }: CustomHTMLElementProps = { style: {}, attributes: {}, eventHandlers: {} },
  ): CustomHTMLElement => {
    const $element = document.createElement(HTMLTag);
    $element.append(document.createTextNode(concatTexts(value, label)));

    if (className) {
      className
        .split(' ')
        .forEach(name => name && $element.classList.add(name));
    }
    if (innerHTML) $element.innerHTML = innerHTML;

    if (style) {
      Object.keys(style).forEach(key => {
        $element.style[key] = style[key];
      });
    }

    if (attributes) {
      Object.keys(attributes).forEach(key => {
        $element.setAttribute(key, attributes[ key ]);
      });
    }

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
