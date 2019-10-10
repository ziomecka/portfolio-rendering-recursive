import {
  CustomDocument,
  CustomDocumentFragment,
  CustomHTMLCollection,
  CustomHTMLElement,
  HTMLElementProps,
  buildRender,
} from './types';

const buildRender: buildRender = (
  (document: CustomDocument) => (
    (props: HTMLElementProps = {}): CustomHTMLCollection => {
      if (props) {
        const createHtmlElement = ({
          HTMLTag,
          value,
          className,
          style = {},
          attributes = {},
        }: HTMLElementProps = {
          style: {},
          attributes: {},
        }): CustomHTMLElement => {
          const $element = document.createElement(HTMLTag);
          $element.innerText = value;
          if (className) {
          }

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

          return $element;
        };

        const appendChild = (
          { children, HTMLTag, ...otherProps }: HTMLElementProps,
          fragment: CustomDocumentFragment = document.createDocumentFragment(),
        ): CustomDocumentFragment => {
          if (!children || !children.length) {
            fragment.append(createHtmlElement({ HTMLTag, ...otherProps }));
            return fragment;
          }

          const $element =
            HTMLTag && createHtmlElement({ HTMLTag, ...otherProps });
          const $fragment = document.createDocumentFragment();

          children.forEach(child => {
            if (typeof child === 'string') {
              appendChild({ value: child }, $fragment);
            } else {
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
