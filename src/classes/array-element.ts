import { LArrayBase, TLArrayValue } from "./array-base";
import { LArraySlice, ILArraySliceable } from "./array-slice";

export class LArrayElement<T> extends LArrayBase<T> implements ILArraySliceable<T> {
  private _value: T;

  constructor(value: T) {
    super();

    this._value = value;
    this._length = 1;
  }

  public at(index: number): T | undefined {
    return index == 0 ? this._value : undefined;
  }

  public slice(start: number, end: number = this._length): TLArrayValue<T> {
    return new LArraySlice(this, start, end);
  }
}
