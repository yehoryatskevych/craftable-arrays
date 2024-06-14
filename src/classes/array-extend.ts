import { TCraftableArrayValue } from "./array-base";

import { CArraySlice } from "./array-slice";
import { CArrayBase } from "./array-base";

export class CArrayExtend<T> extends CArrayBase<T> {
  private _left: TCraftableArrayValue<T>;
  private _right: T;
  
  constructor(left: TCraftableArrayValue<T>, right: T) {
    super();
    
    this._left = left;
    this._right = right;
    this._length = this._left.length + 1;
  }
  
  at(index: number): T | undefined {
    if (index < this._left.length) {
      if (this._left instanceof CArrayBase) {
        return this._left.at(index);
      }
      
      return this._left[index];
    }
    
    if (index == this.length - 1) {
      return this._right;
    }
    
    return undefined;
  }
  
  slice(start: number, end: number = this._length): TCraftableArrayValue<T> {
    return new CArraySlice(this, start, end, false);
  }
  
  toArray() {
    return [...this._left, this._right] as T[];
  }
}
