import { LArrayBase, TLArrayValue } from "./array-base";
import { LArraySlice, ILArraySliceable } from "./array-slice";

export class LArrayExtend<T> extends LArrayBase<T> implements ILArraySliceable<T> {
  private _left: TLArrayValue<T>;
  private _right: T;

  constructor(left: TLArrayValue<T>, right: T) {
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

  public slice(start: number, end: number = this._length): TLArrayValue<T> {
    return new LArraySlice(this, start, end);
  }
}
