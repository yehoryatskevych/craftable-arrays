import { CArrayBase, TCArrayValue } from "./array-base";
import { CArraySlice, ICArraySliceable } from "./array-slice";

export class CArrayWrap<T> extends CArrayBase<T> implements ICArraySliceable<T> {
  private _value: T;

  constructor(value: T) {
    super();
    this._value = value;
    this._length = 1;
  }

  public at(index: number): T | undefined {
    return index == 0 ? this._value : undefined;
  }

  public slice(start: number, end: number = this._length): TCArrayValue<T> {
    return new CArraySlice(this, start, end);
  }
}
