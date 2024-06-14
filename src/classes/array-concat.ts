import { LArrayBase, TLArrayValue } from "./array-base";
import { LArraySlice, ILArraySliceable } from "./array-slice";

export class LArrayConcat<T> extends LArrayBase<T> implements ILArraySliceable<T> {
  private _left: TLArrayValue<T>;
  private _right: TLArrayValue<T>;

  constructor(left: TLArrayValue<T>, right: TLArrayValue<T>) {
    super();

    this._left = left;
    this._right = right;
    this._length = this._left.length + this._right.length;
  }

  public at(index: number) {
    if (index >= this._length) return undefined;

    if (index < this._left.length) {
      return this._left.at(index);
    }

    return this._right.at(index - this._left.length);
  }

  public slice(start: number, end: number = this._length): TLArrayValue<T> {
    return new LArraySlice(this, start, end);
  }

  public toArray(): T[] {
    const leftArr = this._left instanceof LArrayBase ? this._left.toArray() : this._left;
    const rightArr = this._right instanceof LArrayBase ? this._right.toArray() : this._right;

    return leftArr.concat(rightArr);
  }
}
