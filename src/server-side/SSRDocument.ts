import {
  SSRElement,
  SSRElementProps,
} from './SSRElement';
import { SSRFragment } from './SSRFragment';

export class SSRDocument {
  public createElement (tag: string, props?: SSRElementProps): SSRElement {
    return new SSRElement(tag, props);
  }

  public createDocumentFragment (): SSRFragment {
    return new SSRFragment();
  }

  public createTextNode (value = ''): string {
    return value;
  }
}
