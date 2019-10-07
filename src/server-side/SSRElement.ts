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
  private _children: string[];
  public classList: ClassList;
  constructor (
    public readonly tagName: string,
    private readonly selfClosing?: boolean
  ) {
    this._children = [];
    this.classList = new ClassList();
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
    return `${ this.className ? ` class="${ this.className }"` : '' }`;
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
