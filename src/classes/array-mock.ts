import { CArrayBase, TCArrayValue } from "./array-base";

import { CArraySlice, ICArraySliceable } from "./array-slice";

export class CArrayMock<T> extends CArrayBase<T> implements ICArraySliceable<T> {
  constructor() {
    super();

    this._length = 0;
  }

  public at(_index: number): undefined {
    return undefined;
  }

  public slice(_start: number, _end?: number): TCArrayValue<T> {
    return new CArraySlice(this, 0, 0);
  }
}
