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
          attributes = {},
        }: HTMLElementProps = {
          attributes: {},
        }): CustomHTMLElement => {
          const $element = document.createElement(HTMLTag);
          $element.innerText = value;
          if (className) {
            $element.classList.add(className);
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
