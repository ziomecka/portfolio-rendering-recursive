import {
  CustomDocument,
  CustomDocumentFragment,
  CustomHTMLCollection,
  CustomHTMLElement,
  HTMLElementProps,
  buildRender,
} from './types';
import { concatTexts } from './utils/concat-texts';

const buildRender: buildRender = (
  (document: CustomDocument) => (
    (props: HTMLElementProps = {}): CustomHTMLCollection => {
      if (props) {
        const createHtmlElement = ({
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
        }: HTMLElementProps = {
          style: {},
          attributes: {},
        }): CustomHTMLElement => {
          const $element = document.createElement(HTMLTag);
          $element.append(document.createTextNode(concatTexts(value, label)));

          if (className) {
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

          return $element;
        };

        const appendChild = (
          { children, HTMLTag, value, label, ...otherProps }: HTMLElementProps = {},
          fragment: CustomDocumentFragment = document.createDocumentFragment(),
        ): CustomDocumentFragment => {
          if (!children || !children.length) {
            if (HTMLTag) {
              fragment.append(
                createHtmlElement({ HTMLTag, value, label, ...otherProps })
              );
            } else if (value || label) {
              fragment.append(
                document.createTextNode(concatTexts(value, label))
              );
            } else if (otherProps[0]) {
              const [ item ] = otherProps as unknown as any[];
              fragment.append(item);
            }
            return fragment;
          }

          const $element = HTMLTag
            ? createHtmlElement({ HTMLTag, value, label, ...otherProps })
            : null;
          const $fragment = document.createDocumentFragment();
          const $parent = $element || $fragment;

          children.forEach(child => {
            if (typeof child === 'string') {
              $parent.append(document.createTextNode(child));
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

        return appendChild(props).children as unknown as CustomHTMLCollection;
      } else {
        return null;
      }
    }
  )
);

export { buildRender };
