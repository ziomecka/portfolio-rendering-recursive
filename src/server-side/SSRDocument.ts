import { SSRElement } from './SSRElement';
import { SSRFragment } from './SSRFragment';

export class SSRDocument {
  public createElement (tag: string): SSRElement {
    return new SSRElement(tag);
  }

  public createDocumentFragment (): SSRFragment {
    return new SSRFragment();
  }
}
