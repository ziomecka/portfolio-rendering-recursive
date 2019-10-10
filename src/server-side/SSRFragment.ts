import { SSRElement } from './SSRElement';

export class SSRFragment {
  public children: string[];
  constructor () {
    this.children = [];
  }

  public append (value: SSRFragment | SSRElement): void {
    if (value) {
      this.children.push(value.toString());
    }
  }

  public toString (): string {
    return this.children.map(child => child.toString()).join('');
  }
}
