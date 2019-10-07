type buildRender =
  BuildRender<CustomDocument, CustomHTMLCollection, HTMLElementProps>;

const buildRender: buildRender = (
  (document: CustomDocument) => (
    (props: HTMLElementProps): CustomHTMLCollection => {
      const createHtmlElement = ({
        HTMLTag,
        value,
        className,
      }: HTMLElementProps): CustomHTMLElement => {
        const $element = document.createElement(HTMLTag);
        $element.innerText = value;
        if (className) {
          $element.classList.add(className);
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
    }
  )
);

export { buildRender };

export type HTMLTag = |
'p' |
'main' |
'div' |
'header' |
'footer' |
'nav' |
'sidebar' |
'custom';

export type HTMLElementProps = {
  HTMLTag?: HTMLTag;
  value?: string;
  className?: string;
  children?: HTMLElementProps[];
}

type CustomAppend =
  (element: CustomHTMLElement | CustomDocumentFragment) => void;

interface CustomHTMLElement {
  HTMLTag?: HTMLTag;
  innerText: string;
  className: string;
  append: CustomAppend;
  classList?: { add(value: string): void };
}

export interface CustomDocument {
  createDocumentFragment(): CustomDocumentFragment;
  createElement(value: HTMLTag): CustomHTMLElement;
}

interface CustomDocumentFragment {
  append: CustomAppend;
  children: { length: number };
}

export interface CustomHTMLCollection {
  length: number;
  children: { length: number };
}

export type Render<P, C> = (props: P) => C;
export type BuildRender<D, C, P> = (document: D) => Render<P, C>;
