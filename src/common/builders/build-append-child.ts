import {
  AppendChild,
  CreateElement,
} from '../common.types';
import {
  CustomDocument,
  CustomDocumentFragment,
  CustomHTMLCollection,
  HTMLElementProps,
} from '../html.types';
import { concatTexts } from '../utils/concat-texts';
import { isSvg } from '../utils/is-svg';

const buildAppendChild = (
  document: CustomDocument,
  createElement: CreateElement,
): AppendChild => {
  const appendChild = (
    { children, HTMLTag, value, label, ...otherProps }: HTMLElementProps = {},
    documentFragment?: CustomDocumentFragment,
  ): CustomDocumentFragment => {
    const fragment = documentFragment || document.createDocumentFragment();

    if (!children || !children.length) {
      if (HTMLTag) {
        fragment.append(
          createElement({ HTMLTag, value, label, ...otherProps })
        );
      } else if (value || label) {
        fragment.append(
          document.createTextNode(concatTexts(value, label))
        );
      } else if (otherProps[0]) {
        const item = (otherProps as CustomHTMLCollection)[0];
        fragment.append(item);
      }
      return fragment;
    }

    const $element = HTMLTag
      ? createElement({ HTMLTag, value, label, ...otherProps })
      : null;
    const $fragment = document.createDocumentFragment();
    const $parent = $element || $fragment;

    children.forEach(child => {
      if (typeof child === 'string') {
        if (isSvg(child)) {
          if ($element) $element.innerHTML = child;
        } else {
          $parent.append(document.createTextNode(child));
        }
      } else if (child) {
        appendChild(child, $fragment);
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
