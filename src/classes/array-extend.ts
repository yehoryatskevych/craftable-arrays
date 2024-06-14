import { CArrayBase, TCArrayValue } from "./array-base";
import { CArraySlice, ICArraySliceable } from "./array-slice";

export class CArrayExtend<T> extends CArrayBase<T> implements ICArraySliceable<T> {
  private _left: TCArrayValue<T>;
  private _right: T;

  constructor(left: TCArrayValue<T>, right: T) {
    super();

    this._left = left;
    this._right = right;
    this._length = this._left.length + 1;
  }

  public at(index: number) {
    if (index < this._left.length) {
      return this._left.at(index);
    }

    if (index == this._length - 1) {
      return this._right;
    }

    return undefined;
  }

  public slice(start: number, end: number = this._length): TCArrayValue<T> {
    return new CArraySlice(this, start, end);
  }
}
