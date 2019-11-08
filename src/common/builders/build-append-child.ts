/* eslint-disable @typescript-eslint/no-var-requires */
import {
  AppendChild,
  CreateElement,
  CustomDocument,
  CustomDocumentFragment,
  CustomHTMLCollection,
  CustomHTMLElementProps,
} from '../types/';
import { isSvg as isSvgHelper } from '../utils/is-svg';

const { DOMParser } = require('xmldom');

const buildAppendChild = (
  document: CustomDocument,
  createElement: CreateElement,
): AppendChild => {
  const appendChild = (
    {
      children,
      HTMLTag,
      value,
      ...otherProps
    }: CustomHTMLElementProps = {},
    documentFragment?: CustomDocumentFragment,
  ): CustomDocumentFragment => {
    const append = (
      ($parent: CustomDocumentFragment): CustomDocumentFragment => {
        if (HTMLTag) {
          $parent.append(createElement({ HTMLTag, value, ...otherProps }));
        } else if (value) {
          $parent.append(document.createTextNode(value));
        } else if (otherProps[0]) {
          $parent.append((otherProps as CustomHTMLCollection)[0]);
        }

        return $parent;
      }
    );

    const fragment = documentFragment || document.createDocumentFragment();

    const _children = children
      ? children.filter($child => !!$child)
      : [];

    if (!_children.length) return append(fragment);

    const $element = HTMLTag
      ? createElement({ HTMLTag, value, ...otherProps })
      : null;
    const $fragment = document.createDocumentFragment();
    const $parent = $element || $fragment;

    _children.forEach($child => {
      const isString = typeof $child === 'string';
      if (isString) {
        const isSvg = isSvgHelper($child as string);

        if (isSvg) {
          if ($element) {
            $element.innerHTML =
              new DOMParser()
                .parseFromString($child)
                .toString();
          } else {
            console.warn('SVG element can be child only of HTMLElement'); // eslint-disable-line
          }
        } else {
          $parent.append(document.createTextNode($child as string));
        }
      } else {
        appendChild($child, $fragment);
      }
    });

    if ($element) {
      $element.append($fragment);
      fragment.append($element);
    } else {
      fragment.append($fragment);
    }

    return fragment;
  };

  return appendChild;
};

export default buildAppendChild;
