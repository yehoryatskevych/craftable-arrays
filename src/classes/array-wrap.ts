import { TCraftableArrayValue } from "./array-base";

import { CArrayBase } from "./array-base";
import { CArraySlice } from "./array-slice";

export class CArrayWrap<T> extends CArrayBase<T> {
  private _value: T;
  
  constructor(value: T) {
    super();
    this._value = value;
    this._length = 1;
  }
  
  at(index: number): T | undefined  {
    return index == 0 ? this._value : undefined;
  }
  
  slice(start: number, end: number = this._length): TCraftableArrayValue<T> {
    return new CArraySlice(this, start, end, false);
  }
  
  toArray(): T[] {
    return [this._value] as T[];
  }
}
