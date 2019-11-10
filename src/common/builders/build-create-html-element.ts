import {
  CustomDocument,
  CustomHTMLElement,
  CustomHTMLElementProps,
  onEvent,
} from '../types/';
import { resolveArray } from '../utils/resolve-array';

const buildCreateHTMLElement = (
  document: CustomDocument,
  useCaptureDefault = true,
) => (
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
      const value = style[key];

      $element.style[key] = !Array.isArray(value)
        ? value
        : resolveArray(key, value);
    });

    Object.keys(attributes).forEach(key => {
      $element.setAttribute(key, attributes[ key ]);
    });

    Object.keys(eventHandlers).forEach(eventName => {
      const eventHandler = eventHandlers[eventName];
      const [
        callback = eventHandler,
        useCapture = useCaptureDefault,
      ] = Array.isArray(eventHandler) ? eventHandler : [];

      $element.addEventListener(
        eventName.slice(2).toLowerCase(),
        callback as onEvent,
        useCapture
      );
    });

    return $element as unknown as CustomHTMLElement;
  }
);

export default buildCreateHTMLElement;
