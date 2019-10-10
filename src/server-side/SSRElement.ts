import { SSRFragment } from './SSRFragment';

class ClassList {
  public list: string[];
  constructor () {
    this.list = [];
  }

  public get className (): string {
    return this.list.join(' ');
  }

  public add (className: string): void {
    this.list.push(className);
  }
}

export class SSRElement {
  public readonly _attributes: ElementAttributes;
  private readonly selfClosing?: boolean;
  private _children: string[];
  public classList: ClassList;
  public style: Record<string, string>;
  constructor (
    public readonly tagName: string,
    { selfClosing }: SSRElementProps = {}
  ) {
    this.selfClosing = selfClosing;
    this._children = [];
    this.classList = new ClassList();
    this.tagName = tagName;
    this._attributes = {};
    this.style = {};
  }

  public get children (): string {
    return this.renderChildren();
  }

  public get innerText (): string {
    return this.renderChildren();
  }

  public set innerText (value: string) {
    if (typeof value === 'string') {
      this._children.push(value);
    }
  }

  public get innerHTML (): string {
    return this.renderChildren();
  }

  public set innerHTML (value: string) {
    if (typeof value === 'string') {
      this._children.push(value);
    }
  }

  public get className (): string {
    return this.classList.className;
  }

  public append (item: SSRElement | SSRFragment): void {
    this._children.push(item.toString());
  }

  public toString (): string {
    const [ openingTag, closingTag ] = this.tags;
    return (
      openingTag + this.renderChildren() + closingTag
    );
  }

  private renderChildren (): string {
    return this._children.map(child => child.toString()).join('');
  }

  private get attributes (): string {
    const style = JSON.stringify(this.style);

    return (
      Object.keys(this._attributes)
        .reduce((attrStr, attribute) => {
          attrStr +=
            `${ attribute
              ? ` ${ attribute }="${ this._attributes[ attribute ] }"`
              : ` ${ attribute }`
            }`;
          return attrStr;
        }, '')
        .concat(`${ this.className ? ` class="${ this.className }"` : '' }`)
        .concat(style.substring(1, style.length - 1))
    );
  }

  public setAttribute (name: string, value: string): void {
    this._attributes[name] = value;
  }

  public addEventListener (): void {
    return null;
  }

  private get tags (): string[] {
    const { tagName } = this;
    const notSelfClosing = !this.selfClosing;

    if (tagName) {
      return [
        `<${ tagName }${ this.attributes }${ notSelfClosing ? '' : '/' }>`,
        `<${ notSelfClosing ? '/' : '' }${ tagName }>`,
      ];
    } else {
      return [ '', '' ];
    }
  }
}

interface ElementAttributes {
  id?: string;
  type?: string;
}

export interface SSRElementProps {
  selfClosing?: boolean;
}
