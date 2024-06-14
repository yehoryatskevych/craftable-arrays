import { LArrayBase, TLArrayValue } from "./array-base";

import { LArraySlice, ILArraySliceable } from "./array-slice";

export class LArrayMock<T> extends LArrayBase<T> implements ILArraySliceable<T> {
  constructor() {
    super();

    this._length = 0;
  }

  public at(_index: number): undefined {
    return undefined;
  }

  public slice(_start: number, _end?: number): TLArrayValue<T> {
    return new LArraySlice(this, 0, 0);
  }
}
