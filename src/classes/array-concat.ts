import { CArrayBase, TCArrayValue } from "./array-base";
import { CArraySlice, ICArraySliceable } from "./array-slice";

export class CArrayConcat<T> extends CArrayBase<T> implements ICArraySliceable<T> {
  private _left: TCArrayValue<T>;
  private _right: TCArrayValue<T>;

  constructor(left: TCArrayValue<T>, right: TCArrayValue<T>) {
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

  public slice(start: number, end: number = this._length): TCArrayValue<T> {
    return new CArraySlice(this, start, end);
  }

  public toArray(): T[] {
    const leftArr = this._left instanceof CArrayBase ? this._left.toArray() : this._left;
    const rightArr = this._right instanceof CArrayBase ? this._right.toArray() : this._right;

    return leftArr.concat(rightArr);
  }
}
