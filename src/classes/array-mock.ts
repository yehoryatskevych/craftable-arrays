import { TCraftableArrayValue } from "./array-base";

import { CArraySlice } from "./array-slice";
import { CArrayBase } from "./array-base";

export class CArrayMock<T> extends CArrayBase<T> {
  constructor() {
    super();
    
    this._length = 0;
  }
  
  at(_index: number): T | undefined {
    return undefined;
  }
  
  slice(_start: number, _end?: number): TCraftableArrayValue<T> {
    return new CArraySlice(this, 0, 0, false);
  }
  
  toArray(): T[] {
    return [];
  }
}
