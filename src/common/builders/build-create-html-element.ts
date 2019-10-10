import {
  CustomDocument,
  CustomHTMLElement,
  HTMLElementProps,
} from '../html.types';
import { concatTexts } from '../utils/concat-texts';

const buildCreateHTMLElement = (document: CustomDocument) => (
  ({
    HTMLTag,
    value,
    label,
    className,
    onClick,
    onSubmit,
    onChange,
    innerHTML,
    style = {},
    attributes = {},
  }: HTMLElementProps = { style: {}, attributes: {} },
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

    if (onClick) {
      $element.addEventListener('click', onClick);
    }
    if (onSubmit) {
      $element.addEventListener('submit', onSubmit);
    }
    if (onChange) {
      $element.addEventListener('change', onChange);
    }

    return $element as unknown as CustomHTMLElement;
  }
);

export default buildCreateHTMLElement;
