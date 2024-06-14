import type { TCraftableArrayValue } from "./array-base";

import { CArrayBase } from "./array-base";
import { CArraySlice } from "./array-slice";

export class CArrayConcat<T> extends CArrayBase<T> {
  private _left: TCraftableArrayValue<T>;
  private _right: TCraftableArrayValue<T>;
  
  constructor(left: TCraftableArrayValue<T>, right: TCraftableArrayValue<T>) {
    super();
    
    this._left = left;
    this._right = right;
    this._length = this._left.length + this._right.length;
  }
  
  at(index: number) {
    return (
      this.isLeftIndex(index)
        ? this.leftAt(index)
        : this.rightAt(index - this._left.length)
    );
  }
  
  rightAt(index: number) {
    if (this._right instanceof CArrayBase) {
      return this._right.at(index);
    }
    
    return this._right[index];
  }
  
  leftAt(index: number) {
    if (this._left instanceof CArrayBase) {
      return this._left.at(index);
    }
    
    return this._left[index];
  }
  
  slice(start: number, end: number = this._length): TCraftableArrayValue<T> {
    return new CArraySlice(this, start, end, false);
  }
  
  toArray(): T[] {
    return [...this._left, ...this._right] as T[];
  }
  
  isLeftIndex(index: number): boolean {
    return index < this._left.length;
  }
  
  isRightIndex(index: number): boolean {
    return !this.isLeftIndex(index);
  }
}
